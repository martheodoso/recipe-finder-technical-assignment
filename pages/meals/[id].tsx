import { MealType } from "@/libs/types"
import { fetchDataById } from "@/libs/utils/fetchData"

import { GetServerSideProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

type Props = {
	mealData: MealType
}

const Page = ({ mealData }: Props) => {
	const sectionStyle = "lg:h-128 space-y-6 bg-gray-600 p-6 rounded-lg shadow-lg";
	return (
		<div className="dark:bg-gray-900 min-h-screen p-8 space-y-8">
			<Link href="/" className="text-blue-400 underline flex items-center mb-8">
				<svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
				</svg>
				Back to Home</Link>
			<div className={twMerge("md:h-96", sectionStyle)}>
				<div className="relative w-full h-64">
					<Image src={mealData.imageSrc}
						alt={mealData.title}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
						className="object-cover w-full rounded" />
				</div>
				<h1 className="text-3xl font-bold mb-2 text-teal-50">{mealData.title}</h1>
				<p className="mb-4 text-teal-100"><span className="font-semibold">Category:</span> {mealData.category} | <span className="font-semibold">Area:</span> {mealData.area}</p>
			</div>
			<div className={twMerge(sectionStyle)}>
				<h2 className="text-2xl font-semibold mb-2 text-white">Ingredients:</h2>
				<ul className="list-disc pl-2 list-inside text-white">
					{mealData.listOfIngredients.map(({ ingredient, measure }, index) => (
						<li key={index}>{ingredient} - {measure}</li>
					))}
				</ul>
			</div>
			<div className={twMerge(sectionStyle)}>
				<h2 className="text-2xl font-semibold mb-2 text-white">Instructions:</h2>
				<p className="whitespace-pre-line text-white">{mealData.instructions}</p>
			</div>
			<div className={twMerge(sectionStyle)}>
				<h2 className="text-2xl font-semibold mb-2 text-white">Video Tutorial:</h2>
				{mealData.videoLink ? (
					<iframe width="100%" height="auto" src={mealData.videoLink} className="rounded" />
				) : (
					<p className="text-white">No video tutorial available.</p>
				)}
			</div>
		</div>
	)
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params && typeof context.params.id === "string" ? context.params.id : "";
	let mealData: MealType = {} as MealType;

	try {
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