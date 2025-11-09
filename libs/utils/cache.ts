import cache from "memory-cache";
import { MEMORY_NAME } from "../constants";
import { fetchDataByFirstLetter } from "./fetchData";
import { CardDetails } from "../types";

const alphabet =() => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
	return alpha.map((x) => String.fromCharCode(x).toLowerCase());
}

export const getCardDetails = async () => {
	
  let carddetails: CardDetails[] = cache.get(MEMORY_NAME) || [];
	
	if(carddetails.length > 0) return carddetails;
	
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
		
		return carddetails;

	} catch(error) {
		console.error("Failed to fetch the card details", error);
		throw new Error("failed to fetch data");
	}

		
	}

