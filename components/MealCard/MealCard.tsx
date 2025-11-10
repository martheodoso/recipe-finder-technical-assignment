import { CardType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function MealCard({ image, title, link }: CardType) {

  return (
    <Link href={link} className="border rounded border-slate-500
     bg-slate-500 h-56 flex flex-col hover:shadow-lg
      hover:shadow-slate-400 transition-shadow duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-slate-400"
      aria-describedby={title}
      data-testid="meal-card">
      <div className="relative w-full h-full">
        {image && <Image src={`${image}`} alt={title} fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover w-full rounded" loading="lazy" />}
      </div>
      <div className="px-2 py-3">
        {title}
      </div>
    </Link>
  )
}
