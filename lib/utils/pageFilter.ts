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
 * @param areaFilters 
 * @param categoryFilters 
 * @param listOfCardDetails 
 * @returns 
 */
export const filterPageData = (areaFilters: string[], categoryFilters: string[], listOfCardDetails: CardDetails[]) => {
   
    if (listOfCardDetails.length > 0) {
        if(areaFilters.length > 0 && categoryFilters.length > 0) 
            return listOfCardDetails.filter(({ area, category }) => 
        ((!!area && areaFilters.includes(area)) && (!!category && categoryFilters.includes(category))));

        if(areaFilters.length > 0){
            return listOfCardDetails.filter(({ area }) => ((area && areaFilters.includes(area))));
        }
        if(categoryFilters.length > 0) {
            return listOfCardDetails.filter(({ category }) => ((category && categoryFilters.includes(category))));
        }
        
    }
  
    return listOfCardDetails;
}