import Button from "../Button/Button";
import FilterPanel from "../FilterPanel/FilterPanel";

type Props = {
	cuisineList: string[] | undefined;
	areaList: string[] | undefined;
	checkedFilters: string[];
}

const FiltersSection = ({ cuisineList, areaList, checkedFilters }: Props) => {
	return (
		<div className="flex flex-col space-y-4 max-sm:space-y-4 max-sm:grid-rows-2 col-span-1">
			<FilterPanel filterData={cuisineList} checkedFilters={checkedFilters} />
			<FilterPanel filterData={areaList} checkedFilters={checkedFilters} />
			<div className="flex space-x-4 justify-center">
				{/* {!jsEnabled &&  */}
				<Button actionForm="/api/apply-filters" label="Apply" />
				<Button actionForm="/api/remove-filters" label="Reset" />
			</div>
		</div>
	);
}


export default FiltersSection;