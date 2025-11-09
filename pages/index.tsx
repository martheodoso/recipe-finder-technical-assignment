import Button from "@/components/Button/Button";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import MealCard from "@/components/MealCard/MealCard";
import MealCardGrid from "@/components/MealCardGrid/MealCardGrid";
import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import PageLayout from "@/layout/PageLayout";
import { CardDetails, FilterType, PaginationDetails } from "@/libs/types";
import { getCardDetails } from "@/libs/utils/cache";
import { fetchMealsByArea, fetchMealsByCuisine } from "@/libs/utils/fetchData";
import { getAreas, getCuisineList } from "@/libs/utils/pageFilter";
import { GetServerSideProps } from "next";
import { pages } from "next/dist/build/templates/app-page";
import { useEffect, useMemo, useState } from "react";



type Props = {
  pageTitle: string,
  area: FilterType,
  cuisine: FilterType,
  cardDetails: CardDetails[]
  pages: number,
  currentPage: number
}

export default function Home({ area, cuisine, cardDetails, pages, currentPage }: Props) {
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
          <div className="flex flex-col space-y-4 max-sm:space-y-4 max-sm:grid-rows-2 col-span-1">
            <FilterPanel filterData={cuisineList} />
            <FilterPanel filterData={areaList} />
            {!jsEnabled && <Button actionForm="" label="Apply" />}
          </div>
          <div className="w-full col-span-3 space-y-6">
            <MealCardGrid cardDetails={cardDetails} />
            <Pagination pages={pages} currentPage={currentPage} />
          </div>
        </div>
      </form>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { query: { page } } = context;

  let listOfAreas: FilterType = {};
  let listOfCuisines: FilterType = {};
  let pagination: PaginationDetails = { pages: 0, pageDetails: [] };
  try {
    listOfAreas = await fetchMealsByArea();
    listOfCuisines = await fetchMealsByCuisine();
    pagination = await getCardDetails(page ? Number(page) - 1 : 0);
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
      currentPage: page ? Number(page) : 1

    }
  }
}


