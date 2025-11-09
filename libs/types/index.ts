export type FilterType = {
    meals?: {
        [key: string]: string
    }[]
}

export type CardType = {
    image: string;
    title: string;
    link: string;
}

export type CardDetails = {
    id: string,
    title: string,
    imageSrc: string
    category?: string;
    area?: string;
}

export type PaginationDetails = {
    pages: number;
    pageDetails: CardDetails[];
}

export type FilterDataType = {
    value: string;
    checked: boolean;
};

export type MealType = CardDetails & {
    instructions: string;
    videoLink?: string;
    listOfIngredients: {
        ingredient: string;
        measure: string;
    }[];
}


