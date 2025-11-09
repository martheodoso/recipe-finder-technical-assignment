
import FiltersSection from "@/components/FiltersSection/FiltersSections";

import MealCardGrid from "@/components/MealCardGrid/MealCardGrid";

import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import TagsPanel from "@/components/TagsPanel/TagsPanel";
import PageLayout from "@/layout/PageLayout";
import { CardDetails, FilterType, PaginationDetails } from "@/libs/types";
import { getCardDetails, paginationDetails, searchData } from "@/libs/utils/cache";
import { fetchMealsByArea, fetchMealsByCuisine } from "@/libs/utils/fetchData";
import { convertToDefaultFilterData, filterPageData, getAreas, getCuisineList } from "@/libs/utils/pageFilter";
import { GetServerSideProps } from "next";

import { useMemo, useState } from "react";
import EmptyResults from "@/components/EmptyResults/EmptyResults";
import { useRouter } from "next/router";



type Props = {
  pageTitle: string,
  area: FilterType,
  cuisine: FilterType,
  cardDetails: CardDetails[]
  pages: number,
  currentPage: number,
  checkedFilters: string[]
}

export default function Home({ area, cuisine, cardDetails, pages, currentPage, checkedFilters }: Props) {
  const defaultareaList = useMemo(() => convertToDefaultFilterData(getAreas(area), checkedFilters), [area, checkedFilters])
  const defaultcuisineList = useMemo(() => convertToDefaultFilterData(getCuisineList(cuisine), checkedFilters), [cuisine, checkedFilters]);
  const router = useRouter();
  const [areaList, setAreaLIst] = useState(defaultareaList);
  const [cuisineList, setCuisineList] = useState(defaultcuisineList);


  const [areaFilters, setAreaFilters] = useState<string[]>(areaList?.reduce((acc: string[], a) => (checkedFilters.includes(a.value) ? [...acc, a.value] : acc), []) || []);
  const [cuisineFilters, setCuisineFilters] = useState<string[]>(cuisineList?.reduce((acc: string[], a) => (checkedFilters.includes(a.value) ? [...acc, a.value] : acc), []) || []);

  const updateFilters = (prev: string[], checked: boolean, value: string) => {
    if (checked) {
      return [...prev, value];
    } else {
      return prev.filter(f => f !== value);
    }
  }

  const handleCategoryCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const value = target.name;
    const checked = target.checked;
    setCuisineFilters(prev => updateFilters(prev, checked, value));
    setCuisineList(prev => prev.map(c => c.value === value ? { ...c, checked } : c));

    router.push({
      pathname: '/',
      query: {
        ...router.query,
        filters: updateFilters(cuisineFilters, checked, value).concat(areaFilters).join(',')
      }
    }, undefined);

  };

  const handleAreaCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const value = target.name;
    const checked = target.checked;

    setAreaFilters(prev => updateFilters(prev, checked, value));
    setAreaLIst(prev => prev.map(a => a.value === value ? { ...a, checked } : a));
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        filters: updateFilters(areaFilters, checked, value).concat(cuisineFilters).join(',')
      }
    });
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAreaFilters([]);
    setCuisineFilters([]);
    setAreaLIst(prev => prev.map(a => ({ ...a, checked: false })));
    setCuisineList(prev => prev.map(c => ({ ...c, checked: false })));

    router.push({
      pathname: '/',
      query: {}
    });
  }

  const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>, tag: string) => {
    e.preventDefault();
    const isAreaTag = areaFilters.includes(tag);
    let updatedAreaFilters = areaFilters;
    let updatedCuisineFilters = cuisineFilters;

    if (isAreaTag) {
      updatedAreaFilters = areaFilters.filter(f => f !== tag);
      setAreaFilters(updatedAreaFilters);
      setAreaLIst(prev => prev.map(a => a.value === tag ? { ...a, checked: false } : a));
    } else {
      updatedCuisineFilters = cuisineFilters.filter(f => f !== tag);
      setCuisineFilters(updatedCuisineFilters);
      setCuisineList(prev => prev.map(c => c.value === tag ? { ...c, checked: false } : c));
    }

    router.push({
      pathname: '/',
      query: {
        ...router.query,
        filters: updatedAreaFilters.concat(updatedCuisineFilters).join(',')
      }
    });
  }


  return (
    <PageLayout >
      <SearchBar />
      <form method="POST">
        <div className="grid grid-cols-4 space-x-6">
          <FiltersSection
            cuisineList={cuisineList}
            areaList={areaList}
            areaFilters={areaFilters}
            cuisineFilters={cuisineFilters}
            handleCuiseineCheckBoxClick={handleCategoryCheckboxChange}
            handleAreaCheckBoxClick={handleAreaCheckboxChange}
            handleResetClick={handleResetClick} />
          <div className="w-full col-span-3 space-y-6">
            {
              cardDetails.length === 0 ? <EmptyResults /> :
                <>
                  <TagsPanel tags={[...areaFilters, ...cuisineFilters]} handleTagClick={handleTagClick} />
                  <MealCardGrid cardDetails={cardDetails} />
                  <Pagination pages={pages} currentPage={currentPage} />
                </>
            }
          </div>
        </div>
      </form>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { query: { page, filters, search } } = context;

  const listOfFilters = filters ? (typeof filters === 'string' ? filters.split(',') : []) : [];

  let listOfAreas: FilterType = {};
  let listOfCuisines: FilterType = {};
  let listOfCardDetails: CardDetails[] = [];
  let cardDetailsFiltered: CardDetails[] = [];

  let pagination: PaginationDetails = { pages: 0, pageDetails: [] };
  try {
    listOfAreas = await fetchMealsByArea();
    listOfCuisines = await fetchMealsByCuisine();
    listOfCardDetails = await getCardDetails();

    cardDetailsFiltered = filterPageData(listOfFilters, listOfCardDetails);
    if (search && search.length > 0) {

      const searchResults = await searchData(listOfCardDetails, search as string) as CardDetails[];

      listOfCardDetails = cardDetailsFiltered.length > 0 ? cardDetailsFiltered.filter(card => searchResults &&
        searchResults.find(({ area, category, title }) =>
          (area && card?.area?.includes(area)) ||
          (category && card?.category?.includes(category) || (title && card?.title?.includes(title)))))
        : searchResults;

    } else {
      listOfCardDetails = cardDetailsFiltered.length > 0 ? cardDetailsFiltered : listOfCardDetails;
    }

    pagination = paginationDetails(listOfCardDetails, page ? Number(page) - 1 : 0);


  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      pageTitle: "Recipe finder",
      area: listOfAreas,
      cuisine: listOfCuisines,
      cardDetails: pagination.pageDetails || [],
      pages: pagination.pages,
      currentPage: page ? Number(page) : 1,
      checkedFilters: listOfFilters || []
    }
  }
}


