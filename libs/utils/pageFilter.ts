import { CardDetails, FilterType } from "../types";

/**
 * 
 * @param area 
 * @returns all categories / areas filter data as string array
 */
export const getAreas = (area: FilterType) => {
    return area?.meals?.reduce((acc: string[], item: Record<string, string>) => [...acc, item.strArea], []);
}

/**
 * 
 * @param cuisine 
 * @returns all categories / cuisine filter data as string array
 */
export const getCuisineList = (cuisine: FilterType) => (
     cuisine?.meals?.reduce((acc: string[], item: Record<string, string>) => [...acc, item.strCategory], []))

/**
  * 
  * @param allTags 
  * @param selectedTags 
  * @returns all tags excpet the selected tab
*/
export const filterTags = (allTags: string[], selectedTags: string) => {
   return allTags.filter(f => f !== selectedTags);
}

/**
 * Convert filter data to object
 * @param filters 
 * @param checkedFilters 
 * @returns object { value: string, checked: boolean }
 */
export const convertToDefaultFilterData = (filters: string[] | undefined, checkedFilters: string[] | null) => {
    if(!filters) return [];
    
    return filters?.map(f => ({
         value: f, checked: checkedFilters?.includes(f) || false
    }));
}

/**
 * Filter meal card object by category or cuisine
 * @param listOfFilters 
 * @param listOfCardDetails 
 * @returns meal card data object
 */
export const filterPageData = (listOfFilters: string[], listOfCardDetails: CardDetails[]) => {
     if (listOfFilters.length > 0 && listOfCardDetails.length > 0) {
      return listOfCardDetails.filter(({ area, category }) => {
        return (area && listOfFilters.includes(area)) || (category && listOfFilters.includes(category));
      });
    }
		
    return listOfCardDetails;
}