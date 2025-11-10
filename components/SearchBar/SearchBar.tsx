import { useRouter } from "next/router";
import Button from "../Button/Button";
import { useState } from "react";

type SearchBarProps = {
  handleSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, searchTerm: string) => void;
}

export default function SearchBar({ handleSearch }: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query?.search || "");


  return (
    <div className="flex flex-col space-y-4 mb-6">
      <label className="text-gray-600 dark:text-gray-400" htmlFor="search">Search and discover delicious meals from around the world</label>
      <div className="space-x-4 flex flex-row">
        <input id="search" type="text" name="search" defaultValue={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-black bg-white rounded py-2 pl-4 grow-5" placeholder="Search for meals..." />
        <Button handleClick={(e) => handleSearch(e, searchTerm as string)} actionForm="/api/search" label="Search" />
      </div>
    </div>
  );
}
