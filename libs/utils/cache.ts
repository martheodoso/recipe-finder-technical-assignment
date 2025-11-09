import cache from "memory-cache";
import { ITEMS_PER_PAGE, MEMORY_NAME } from "../constants";
import { fetchDataByFirstLetter } from "./fetchData";
import { CardDetails } from "../types";

const alphabet =() => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
	return alpha.map((x) => String.fromCharCode(x).toLowerCase());
}

const paginationDetails = (details: CardDetails[], pageNumber: number) => {
	 console.log(pageNumber);
	 const pages = Math.ceil(details.length / ITEMS_PER_PAGE);
	 const pageDetails = details.slice(pageNumber*ITEMS_PER_PAGE, pageNumber*ITEMS_PER_PAGE + ITEMS_PER_PAGE);
	 
	 return {
		pages,
		pageDetails
	}
}

export const getCardDetails = async (page: number) => {
	
  let carddetails: CardDetails[] = cache.get(MEMORY_NAME) || [];
	
	if(carddetails.length > 0) return paginationDetails(carddetails, page);
	
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
						imageSrc: detail.strMealThumb
					}], []);
				
				carddetails = [
					...carddetails,
					...filteredDetails
				]
			}
		}
 
		cache.put(MEMORY_NAME, carddetails);
		
		return paginationDetails(carddetails, page);

	} catch(error) {
		console.error("Failed to fetch the card details", error);
		throw new Error("failed to fetch data");
	}

		
	}

