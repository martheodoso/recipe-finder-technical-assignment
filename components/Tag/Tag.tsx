type TagProps = {
	title: string;
};

const Tag = ({ title }: TagProps) => {
	return (
		<div className="bg-blue-800 text-teal-50 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2 w-fit flex items-center">

			<span>{title}</span>
			<button type="submit" className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
				formAction={`/api/remove-filters?removeTag=${title}`}>
				<svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 12.819l-2.651 2.03a1.2 1.2 0 1 1-1.697-1.697l2.758-2.657-2.759-2.657a1.2 1.2 0 1 1 1.697-1.697L10 9.183l2.651-2.03a1.2 1.2 0 1 1 1.697 1.697l-2.758 2.657 2.758 2.657a1.2 1.2 0 0 1 0 1.697z" />
				</svg>
			</button>
		</div>);
};

export default Tag;