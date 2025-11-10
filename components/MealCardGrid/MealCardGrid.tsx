import { CardDetails } from "@/lib/types";
import MealCard from "../MealCard/MealCard";

type Props = {
	cardDetails: CardDetails[]
}

const MealCardGrid = ({ cardDetails }: Props) => {

	return (
		<div className="col-span-3 text-teal-50">
			<div className="grid grid-cols-2 gap-5">
				{cardDetails?.map(({ imageSrc, title, id }) => (
					<MealCard key={id} image={imageSrc} title={title} link={`/meals/${id}`} />
				))}
			</div>
		</div>
	)

}

export default MealCardGrid;