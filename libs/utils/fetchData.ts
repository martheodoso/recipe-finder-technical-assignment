



export const fetchMealsByArea = async () => {
  const api = process.env.API;
  try {
    console.log(`${api}/list.php?a=lis`);
    const response = await fetch(`${api}/list.php?a=list`, 
			{ next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the list of areas!!")
    return await response.json();
  } catch(error) {
    console.error(error);
		throw new Error("Failed to fetch the list of areas!!")
 }
}

export const fetchMealsByCuisine = async () => {
  const api = process.env.API;
	try {
    const response = await fetch(`${api}/list.php?c=list`, 
			{ next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the list of cuisines!!")
    return await response.json();
  } catch(error) {
    console.error(error);
		throw new Error("Failed to fetch the list of cuisines!!")
 }
}

export const fetchDataByFirstLetter = async (letter: string) => {
	const api = process.env.API;
	try {
    const response = await fetch(`${api}/search.php?f=${letter}`, 
			{ next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the data when filtering by first letter!!")
    return await response.json();
  } catch(error) {
    console.error(error);
		throw new Error("Failed to fetch the data when filtering by first letter!!")
 }
}

export const fetchDataByIngredient = async (ingredient: string) => {
	const api = process.env.API;
	try {
    const response = await fetch(`${api}/filter.php?i=${ingredient}`, 
			{ next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the data when filtering by ingredient!!")
    return await response.json();
  } catch(error) {
    console.error(error);
		throw new Error("Failed to fetch the data when filtering by ingredient!!")
 }
}

export const fetchDataById = async (id: string) => {
  const api = process.env.API;
  try {
    const response = await fetch(`${api}/lookup.php?i=${id}`, 
			{ next: { revalidate: 3600 } });
    if(!response.ok)
			throw new Error("Failed to fetch the data when filtering by ingredient!!")
    return await response.json();
  } catch(error) {
    console.error(error);
    throw new Error("Failed to fetch the data by id!!")
  }
 }