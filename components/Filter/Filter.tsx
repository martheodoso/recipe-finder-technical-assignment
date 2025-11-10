
type FilterProps = {
	item: string;
	isChecked: boolean;
	handleCheckBoxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Filter = ({ item, isChecked, handleCheckBoxClick }: FilterProps) => {
	return <div className="dark:text-white space-x-4">
		<input type="checkbox"
			name={item}
			id={item}
			checked={isChecked}
			onChange={handleCheckBoxClick}
		/>
		<label htmlFor={item}>{item}</label>
	</div>;
};

export default Filter;