import { CardType } from "@/libs/types";
import Image from "next/image";

export default function MealCard({ image, title, link }: CardType) {

  return (
    <a href={link} className="border rounded border-slate-500 bg-slate-500 h-56 flex flex-col">
      <div className="relative w-full h-full">
        {image && <Image src={`${image}`} alt={title} fill objectFit="cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className=" w-full rounded" loading="lazy" />}
      </div>
      <div className="px-2 py-3">
        {title}
      </div>
    </a>
  )
}
