import Button from "../Button/Button";


export default function SearchBar() {

  const handleClick = () => {

  }
  return (
    <form className="flex flex-col space-y-4" method="POST">
      <label className="text-gray-600 dark:text-gray-400" htmlFor="search">Search and discover delicious meals from around the world</label>
      <div className="space-x-4 flex flex-row">
        <input id="search" type="text" name="search"
          className="border border-black bg-white rounded py-2 pl-4 grow-5" placeholder="Search for meals..." />
        <Button handleClick={handleClick} actionForm="/api/search" label="Search" />
      </div>
    </form>
  );
}
