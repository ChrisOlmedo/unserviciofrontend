export type Image = {
    url: string;
    file?: File | null;
};

export interface Review {
    id: string;
    comment: string;
    rating: number;
    author: string;
    date: string;
} 