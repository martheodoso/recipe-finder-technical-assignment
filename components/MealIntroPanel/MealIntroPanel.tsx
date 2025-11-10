import Image from "next/image";

type Props = {
  mealData: {
    imageSrc: string;
    title: string;
    category?: string;
    area?: string;
  }
}

const MealIntroPanel = ({ mealData }: Props) => {
  return <>
    <div className="relative w-full h-64 md:h-72 ">
      <Image src={mealData.imageSrc}
        data-testid={"meal-image"}
        alt={mealData.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className="object-cover w-full rounded" />
    </div>
    <h1 className="text-3xl font-bold mb-2 text-teal-50">{mealData.title}</h1>
    <p className="mb-4 text-teal-100 p-6"><span className="font-semibold">Category:</span> {mealData.category} | <span className="font-semibold">Area:</span> {mealData.area}</p></>;
};

export default MealIntroPanel;