import cache from "memory-cache";
import { ITEMS_PER_PAGE, MEMORY_NAME } from "../constants";
import { fetchDataByFirstLetter, fetchDataByIngredient } from "./fetchData";
import { CardDetails } from "../types";
import { get } from "http";

const alphabet =() => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
	return alpha.map((x) => String.fromCharCode(x).toLowerCase());
}

export const paginationDetails = (details: CardDetails[], pageNumber: number) => {
	
	 const pages = Math.ceil(details.length / ITEMS_PER_PAGE);
	 const endIndex = pageNumber*ITEMS_PER_PAGE + ITEMS_PER_PAGE > details.length ? 
	 details.length : pageNumber*ITEMS_PER_PAGE + ITEMS_PER_PAGE;
	 
	 const pageDetails = details.slice(pageNumber*ITEMS_PER_PAGE, endIndex);
	  
	 return {
		pages,
		pageDetails
	}
}

export const getCardDetails = async () => {
	
  let carddetails: CardDetails[] = cache.get(MEMORY_NAME) || [];
	
	if(carddetails.length > 0) return carddetails
	
	try {
		const alpha = alphabet();

		for(const ltr of alpha) {
			const details = await fetchDataByFirstLetter(ltr);
      
			if(!details)
				console.error(`Failed to get data for letter ${ltr}`);
			
			else if(details?.meals) {
				 
				const filteredDetails = details.meals.reduce((acc: CardDetails[], detail: Record<string, string> ) => 
					[...acc, {
						id: detail.idMeal,
						title: detail.strMeal,
						imageSrc: detail.strMealThumb,
						category: detail.strCategory,
						area: detail.strArea
					}], []);
				
				carddetails = [
					...carddetails,
					...filteredDetails
				]
			}
		}
 
		cache.put(MEMORY_NAME, carddetails);
		
		return carddetails;

	} catch(error) {
		console.error("Failed to fetch the card details", error);
		throw new Error("failed to fetch data");
	}
}

export const clearCache = () => {
	cache.clear();
}

export const convertToStringWithUnderscores = (input: string) => {
	return input.replace(/\s+/g, '_');
}

export const filterCardDetails = (data: CardDetails[], item: string) => {
	const filteredData = data.filter(({ area, category, title }) => {
		return area?.includes(item) || category?.includes(item) || title?.includes(item);
	});
	return filteredData;
}

export const searchData = async (cachedData: CardDetails[], search: string) => {
	const item = convertToStringWithUnderscores(search.toLowerCase());
	
	try {
		const filterByIngredientData = await fetchDataByIngredient(item);
		
		if(filterByIngredientData?.meals?.length > 0) {
			
			return filterByIngredientData?.meals.map((meal: Record<string, string>) => ({
				id: meal.idMeal,
				title: meal.strMeal,
				imageSrc: meal.strMealThumb
			}));
		}
		return [];

	} catch(error) {
		console.error(error);
		return [];
	}
	
	 
}

