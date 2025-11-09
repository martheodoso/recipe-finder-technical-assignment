
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
type Props = {
  filterData: string[] | undefined;
  className?: string;
  checkedFilters?: string[];
}

export default function FilterPanel({ filterData, className, checkedFilters }: Props) {

  return filterData ? (
    <div className={twMerge("border-2 border-gray-200 p-4 rounded max-h-72", className)}>
      <div className="h-60 overflow-scroll">
        {filterData?.map((item) => {
          const isChecked = !!(checkedFilters && item && checkedFilters.includes(item));
          return (
            <div key={uuidv4()} className="dark:text-white space-x-4">
              <input type="checkbox" name={item} id={item} defaultChecked={isChecked} readOnly />
              <label htmlFor={item}>{item}</label>
            </div>
          )
        })}
      </div>
    </div>
  ) : null;
}
