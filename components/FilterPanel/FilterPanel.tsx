

import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
import Filter from '../Filter/Filter';
import { FilterDataType } from '@/libs/types';
type Props = {
  filterData: FilterDataType[] | undefined;
  className?: string;
  checkedFilters?: string[];
  handleCheckBoxClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterPanel({ filterData, className, handleCheckBoxClick }: Props) {
  return filterData ? (
    <div className={twMerge("border-2 border-gray-200 p-4 rounded max-h-72", className)}>
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
    </div>
  ) : null;
}
