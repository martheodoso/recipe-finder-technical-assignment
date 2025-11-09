import { twMerge } from "tailwind-merge";

type Props = {
	pages: number
	currentPage?: number,
}

export const Pagination = ({ pages, currentPage }: Props) => {
	const isInValidPrevious = !currentPage || currentPage < 2;
	const isInvalidNext = currentPage === pages;
	console.log("Current Page in Pagination:", currentPage);
	const paginationbuttonclass = [
		"px-4",
		"py-2",
		"mx-1",
		"border-grey-600",
		"dark:border-gray-600",
		"dark:text-white",
		"bg-gray-200",
		"dark:bg-gray-800",
		"hover:bg-gray-300",
		"dark:hover:bg-gray-700",
		"hover:cursor-pointer",

		"rounded"];

	return (
		<div className="inline-flex flex-wrap mt-4 justify-center w-full">
			<button className={twMerge(paginationbuttonclass,
				(isInValidPrevious) && "opacity-50 cursor-not-allowed")}
				disabled={isInValidPrevious}
				formAction={`/api/pagination?action=previous`}>Previous</button>
			{Array.from({ length: pages }, (_, i) => i + 1).map((page, indx) => {
				return (
					<button key={page} className={twMerge(paginationbuttonclass, currentPage === indx + 1 ? "dark:bg-blue-800 bg-blue-800" : "")}
						formAction={`/api/pagination?nextPage=${indx + 1}`}>{page}</button>
				)
			})}
			<button className={twMerge(paginationbuttonclass,
				isInvalidNext && "opacity-50 cursor-not-allowed")}
				disabled={isInvalidNext}
				formAction={`/api/pagination?action=next`}>Next</button>
		</div>
	)
};

