import Button from "@/components/Button/Button";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import MealCard from "@/components/MealCard/MealCard";
import MealCardGrid from "@/components/MealCardGrid/MealCardGrid";
import SearchBar from "@/components/SearchBar/SearchBar";
import PageLayout from "@/layout/PageLayout";
import { CardDetails, CardType, FilterType } from "@/libs/types";
import { getCardDetails } from "@/libs/utils/cache";
import { fetchMealsByArea, fetchMealsByCuisine } from "@/libs/utils/fetchData";
import { getAreas, getCuisineList } from "@/libs/utils/pageFilter";
import { GetServerSideProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


type Props = {
  pageTitle: string,
  area: FilterType,
  cuisine: FilterType,
  cardDetails: CardDetails[]
}

export default function Home({ area, cuisine, cardDetails }: Props) {
  const [jsEnabled, setJSEnabled] = useState(false);

  useEffect(() => {
    if (!jsEnabled) setJSEnabled(true);
  }, [jsEnabled])

  const areaList = useMemo(() => getAreas(area), [area])
  const cuisineList = useMemo(() => getCuisineList(cuisine), [cuisine]);

  return (
    <PageLayout >

      <SearchBar />

      <div className="grid grid-cols-4 space-x-6">
        <form className="grid grid-rows-2 space-y-4 max-sm:space-y-4 max-sm:grid-rows-2 col-span-1">
          <FilterPanel filterData={cuisineList} />
          <FilterPanel filterData={areaList} />
          {!jsEnabled && <Button actionForm="" label="Apply" />}
        </form>
        <MealCardGrid cardDetails={cardDetails} />
      </div>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let listOfAreas: FilterType = {};
  let listOfCuisines: FilterType = {};
  let cardDetails: CardDetails[] = [];
  try {
    listOfAreas = await fetchMealsByArea();
    listOfCuisines = await fetchMealsByCuisine();
    cardDetails = await getCardDetails();
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      pageTitle: "Recipe finder",
      area: listOfAreas,
      cuisine: listOfCuisines,
      cardDetails: cardDetails
    }
  }
}


