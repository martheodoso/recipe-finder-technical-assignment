import { CardDetails, FilterType } from "../types";

export const getAreas = (area: FilterType) => {
    return area?.meals?.reduce((acc: string[], item: Record<string, string>) => [...acc, item.strArea], []);
}

export const getCuisineList = (cuisine: FilterType) => (
     cuisine?.meals?.reduce((acc: string[], item: Record<string, string>) => [...acc, item.strCategory], []))

export const filterTags = (allTags: string[], selectedTags: string) => {
   return allTags.filter(f => f !== selectedTags);
}

export const convertToDefaultFilterData = (filters: string[] | undefined, checkedFilters: string[] | null) => {
    if(!filters) return [];
    
    return filters?.map(f => ({
         value: f, checked: checkedFilters?.includes(f) || false
    }));
}

export const filterPageData = (listOfFilters: string[], listOfCardDetails: CardDetails[]) => {
     if (listOfFilters.length > 0 && listOfCardDetails.length > 0) {
      return listOfCardDetails.filter(({ area, category }) => {
        return (area && listOfFilters.includes(area)) || (category && listOfFilters.includes(category));
      });
    }
		
    return listOfCardDetails;
}