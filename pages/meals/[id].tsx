import MealDescriptionPanel from "@/components/MealDescriptionPanel/MealDescriptionPanel"
import MealIngredientsPanel from "@/components/MealIngredientsPanel/MealIngredientsPanel"
import MealIntroPanel from "@/components/MealIntroPanel/MealIntroPanel"

import Video from "@/components/Video/Video"
import { MealType } from "@/libs/types"
import { fetchDataById } from "@/libs/utils/fetchData"

import { GetServerSideProps } from "next"

import Link from "next/link"
import { twMerge } from "tailwind-merge"

type Props = {
	mealData: MealType
}

const Page = ({ mealData }: Props) => {
	const sectionStyle = "space-y-6 bg-gray-600 p-6 rounded-lg shadow-lg";

	return (
		<div className="dark:bg-gray-900">
			<div className="max-w-4xl mx-auto min-h-screen p-8 space-y-8">
				<Link href="/" className="text-blue-400 underline flex items-center mb-8">
					<svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
					</svg>
					Back to Home</Link>
				<div className={twMerge("md:h-[450px]", sectionStyle)}>
					<MealIntroPanel mealData={{
						imageSrc: mealData.imageSrc,
						title: mealData.title,
						category: mealData.category,
						area: mealData.area
					}} />
				</div>
				{
					mealData.listOfIngredients && <div className={twMerge(sectionStyle)}>
						<MealIngredientsPanel ingredients={mealData.listOfIngredients} />
					</div>
				}
				{
					mealData.instructions && <div className={twMerge(sectionStyle)}>
						<MealDescriptionPanel description={mealData.instructions} />
					</div>}
				{mealData.videoLink && <Video videoLink={mealData.videoLink} title={mealData.title} className={sectionStyle} />}
			</div>
		</div>
	)
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params && typeof context.params.id === "string" ? context.params.id : "";
	let mealData: MealType = {} as MealType;

	try {
		// Fetch meal data by ID
		const res = await fetchDataById(id);
		if (res && res.meals && res.meals.length > 0) {
			const meal = res.meals[0];
			const listOfIngredients = [];
			for (let i = 1; i <= 20; i++) {
				const ingredient = meal[`strIngredient${i}`];
				const measure = meal[`strMeasure${i}`];
				if (ingredient && ingredient.trim() !== "") {
					listOfIngredients.push({ ingredient, measure });
				}
			}

			mealData = {
				id: meal.idMeal,
				title: meal.strMeal,
				area: meal.strArea,
				imageSrc: meal.strMealThumb,
				category: meal.strCategory,
				instructions: meal.strInstructions,
				videoLink: meal.strYoutube,
				listOfIngredients,
			};
		}
	} catch (error) {
		console.error("Error fetching meal data by ID:", error);
	}
	return {
		props: {
			mealData,
		}
	}
}