

import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
import Filter from '../Checkbox/Checkbox';
import { FilterDataType } from '@/lib/types';
type Props = {
  filterData: FilterDataType[] | undefined;
  handleCheckBoxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  className?: string;
  checkedFilters?: string[];
}

export default function FilterPanel({ filterData, className, title, handleCheckBoxClick }: Props) {
  return filterData ? (
    <div className={twMerge("border-2 border-gray-200 p-4 rounded max-h-[320px]", className)}>
      <fieldset
        aria-describedby={`${title}-filter`}>
        <legend className="text-base dark:text-white"><h4 className='mb-4'>{title}</h4></legend>
        <div className="h-60 overflow-scroll">
          {filterData?.map((item) => {
            return (
              <Filter key={uuidv4()}
                item={item.value}
                isChecked={item.checked}
                handleCheckBoxClick={handleCheckBoxClick} />
            )
          })}
        </div>
      </fieldset>
    </div>
  ) : null;
}
