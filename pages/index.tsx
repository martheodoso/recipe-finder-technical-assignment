export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Recipe Finder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search and discover delicious meals from around the world
          </p>
        </header>

        <div className="mb-6">
          <p className="text-gray-500 border border-dashed border-gray-300 p-4 rounded">
            TODO: Integrate SearchBar component
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-500 border border-dashed border-gray-300 p-4 rounded">
            TODO: Integrate FilterPanel component
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <p className="col-span-full text-gray-500 text-center py-12 border border-dashed border-gray-300 rounded">
            TODO: Display meal cards
          </p>
        </div>
      </div>
    </div>
  );
}
