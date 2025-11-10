import { useEffect, useState } from "react";
import Button from "../Button/Button";
import FilterPanel from "../FilterPanel/FilterPanel";
import { FilterDataType } from "@/lib/types";

type Props = {
	cuisineList: FilterDataType[] | undefined;
	areaList: FilterDataType[] | undefined;
	handleCuiseineCheckBoxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAreaCheckBoxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
		handleCuiseineCheckBoxClick,
		handleAreaCheckBoxClick,
		handleResetClick }: Props) => {
	const [jsEnabled, setJSEnabled] = useState(false);

	useEffect(() => {
		if (!jsEnabled) setJSEnabled(true);
	}, [jsEnabled])

	return (
		<div className="flex flex-col space-y-4 max-sm:space-y-4 max-sm:grid-rows-2 col-span-1">
			<FilterPanel
				filterData={cuisineList}
				checkedFilters={areaFilters}
				title="Category"
				handleCheckBoxClick={handleCuiseineCheckBoxClick} />
			<FilterPanel
				filterData={areaList}
				checkedFilters={cuisineFilters}
				title={"Cuiseine / Area"}
				handleCheckBoxClick={handleAreaCheckBoxClick} />
			<div className="flex space-x-4 justify-center">
				{!jsEnabled &&
					<Button actionForm="/api/apply-filters" label="Apply" />}
				<Button handleClick={handleResetClick} actionForm={`/api/remove-filters?reset=true`} label="Reset" />
			</div>
		</div>
	);
}


export default FiltersSection;