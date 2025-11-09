import { FilterType } from "../types";

export const getAreas = (area: FilterType) => {
    return area?.meals?.reduce((acc: string[], item: Record<string, string>) => [...acc, item.strArea], []);
}

export const getCuisineList = (cuisine: FilterType) => (
     cuisine?.meals?.reduce((acc: string[], item: Record<string, string>) => [...acc, item.strCategory], []))