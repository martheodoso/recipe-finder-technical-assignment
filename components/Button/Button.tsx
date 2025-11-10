
type Props = {
	actionForm: string
	handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	label?: string
}

const Button = ({ handleClick, label, actionForm }: Props) => {
	return (
		<button formAction={actionForm} onClick={handleClick}
			className="text-white px-6 py-3 bg-blue-800 rounded font-semibold hover:cursor-pointer hover:bg-blue-900 transition-colors focus:shadow-sm focus:shadow-blue-500">
			{label}
		</button>
	)
}

export default Button;