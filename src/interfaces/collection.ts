import IProduct from "./product";
export interface ICategory {
    id: number;
    image: string;
    name: string;
    description: string;
    productArr: number[];
    hasSubCategory :boolean;
    subCategory: number[] | null;
}
export interface ISubCategory {
    id: number;
    image: string;
    name: string;
    show_type: string;
    description: string;
    productArr: IProduct[];
}