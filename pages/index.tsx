
import FiltersSection from "@/components/FiltersSection/FiltersSections";

import MealCardGrid from "@/components/MealCardGrid/MealCardGrid";

import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import TagsPanel from "@/components/TagsPanel/TagsPanel";
import PageLayout from "@/layout/PageLayout";
import { CardDetails, FilterType, PaginationDetails } from "@/libs/types";
import { getCardDetails, paginationDetails, searchData } from "@/libs/utils/cache";
import { fetchMealsByArea, fetchMealsByCuisine } from "@/libs/utils/fetchData";
import { getAreas, getCuisineList } from "@/libs/utils/pageFilter";
import { GetServerSideProps } from "next";

import { useEffect, useMemo, useState } from "react";
import EmptyResults from "@/components/EmptyResults/EmptyResults";



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
  const [jsEnabled, setJSEnabled] = useState(false);

  useEffect(() => {
    if (!jsEnabled) setJSEnabled(true);
  }, [jsEnabled])

  const areaList = useMemo(() => getAreas(area), [area])
  const cuisineList = useMemo(() => getCuisineList(cuisine), [cuisine]);

  return (
    <PageLayout >
      <SearchBar />
      <form method="POST">
        <div className="grid grid-cols-4 space-x-6">
          <FiltersSection cuisineList={cuisineList} areaList={areaList} checkedFilters={checkedFilters} />
          <div className="w-full col-span-3 space-y-6">
            {
              cardDetails.length === 0 ? <EmptyResults /> :
                <>
                  <TagsPanel tags={checkedFilters} />
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
  const cardDetailsSearch: CardDetails[] = [];
  let pagination: PaginationDetails = { pages: 0, pageDetails: [] };
  try {
    listOfAreas = await fetchMealsByArea();
    listOfCuisines = await fetchMealsByCuisine();
    listOfCardDetails = await getCardDetails();

    if (listOfFilters.length > 0 && listOfCardDetails.length > 0) {
      cardDetailsFiltered = listOfCardDetails.filter(({ area, category }) => {
        return (area && listOfFilters.includes(area)) || (category && listOfFilters.includes(category));
      });
    }
    console.log("Filters applied:", cardDetailsFiltered);
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
    console.log(pagination);

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


