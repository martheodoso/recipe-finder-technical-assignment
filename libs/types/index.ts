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
}

export type PaginationDetails = {
    pages: number;
    pageDetails: CardDetails[];
}


