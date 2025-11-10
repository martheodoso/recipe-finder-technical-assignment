
/**
 * Fetch data by category / area API call
 * @returns 
 */
export const fetchMealsByArea = async () => {
  const api = process.env.API;
  try {
    const response = await fetch(`${api}/list.php?a=list`, 
			{cache: "force-cache", next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the list of areas!!")
    return await response.json();
  } catch(error) {
    console.error(error);
		throw new Error("Failed to fetch the list of areas!!")
 }
}

/**
 * Fetch data by category / cuisine API call
 * @returns 
 */
export const fetchMealsByCuisine = async () => {
  const api = process.env.API;
	try {
    
    const response = await fetch(`${api}/list.php?c=list`, 
			{ cache: "force-cache", next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the list of cuisines!!")
    return await response.json();
  } catch(error) {
    console.error(error);
		throw new Error("Failed to fetch the list of cuisines!!")
 }
}

/**
 * Fetch data by first letter API call
 * @param letter 
 * @returns 
 */
export const fetchDataByFirstLetter = async (letter: string) => {
	const api = process.env.API;
	try {
    const response = await fetch(`${api}/search.php?f=${letter}`, 
			{ cache: "force-cache", next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the data when filtering by first letter!!")
    return await response.json();
  } catch(error) {
    console.error(error);
		throw new Error("Failed to fetch the data when filtering by first letter!!")
 }
}

/**
 * Fetch data by first letter API call 
 * @param ingredient 
 * @returns 
 */
export const fetchDataByIngredient = async (ingredient: string) => {
	const api = process.env.API;
	try {
    const response = await fetch(`${api}/filter.php?i=${ingredient}`, 
			{cache: "force-cache", next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the data when filtering by ingredient!!")
    return await response.json();
  } catch(error) {
    console.error(error);
		throw new Error("Failed to fetch the data when filtering by ingredient!!")
 }
}

/**
 * Fetch data by id API call
 * @param id 
 * @returns 
 */
export const fetchDataById = async (id: string) => {
  const api = process.env.API;
  try {
    const response = await fetch(`${api}/lookup.php?i=${id}`, 
			{cache: "force-cache", next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the data when filtering by ingredient!!")
    return await response.json();
  } catch(error) {
    console.error(error);
    throw new Error("Failed to fetch the data by id!!")
  }
 }