import { useEffect, useState } from "react";
import Button from "../Button/Button";
import FilterPanel from "../FilterPanel/FilterPanel";
import { FilterDataType } from "@/lib/types";

type Props = {
	cuisineList: FilterDataType[] | undefined;
	areaList: FilterDataType[] | undefined;
	handleCheckBoxClick: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
	handleResetClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	areaFilters?: string[];
	cuisineFilters?: string[];

}

const FiltersSection = (
	{
		cuisineList,
		areaList,
		areaFilters,
		cuisineFilters,
		handleCheckBoxClick,
		handleResetClick }: Props) => {
	const [jsEnabled, setJSEnabled] = useState(false);

	useEffect(() => {
		if (!jsEnabled) setJSEnabled(true);
	}, [jsEnabled])

	const data = [

		{
			id: "category",
			title: "Category",
			list: cuisineList,
			checked: cuisineFilters
		},
		{
			id: "area",
			title: "Cuisine/Area",
			list: areaList,
			checked: areaFilters
		},
	]

	return (
		<div className="flex flex-col space-y-4 max-sm:space-y-4 max-sm:grid-rows-2 col-span-1">
			{
				data.map(({ id, title, list, checked }) => {
					return (
						<FilterPanel key={id} filterData={list} checkedFilters={checked} title={title} handleCheckBoxClick={(e) => handleCheckBoxClick(e, id)} />
					)
				})
			}
			<div className="flex space-x-4 justify-center">
				{!jsEnabled &&
					<Button actionForm="/api/apply-filters" label="Apply" />}
				<Button handleClick={handleResetClick} actionForm={`/api/remove-filters?reset=true`} label="Reset" />
			</div>
		</div>
	);
}


export default FiltersSection;