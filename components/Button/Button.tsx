
type Props = {
	actionForm: string
	handleClick?: () => void
	label?: string

}

const Button = ({ handleClick, label, actionForm }: Props) => {
	return (
		<button formAction={actionForm} onClick={handleClick}
			className="text-white px-6 py-3 bg-blue-800 rounded font-semibold hover:cursor-pointer">
			{label}
		</button>
	)
}

export default Button;