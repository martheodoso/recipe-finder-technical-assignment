
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
type Props = {
  filterData: string[] | undefined;
  className?: string;
}

export default function FilterPanel({ filterData, className }: Props) {

  return filterData ? (
    <div className={twMerge("border-2 border-gray-200 p-4 rounded", className)}>
      <div className="h-60 overflow-scroll">
        {filterData?.map((item) => (
          <div key={uuidv4()} className="dark:text-white space-x-4">
            <input type="checkbox" name={item} id={item} />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
