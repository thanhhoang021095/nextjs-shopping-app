import IProduct from "./product";
export interface ICategory {
    _id?: string;
    id: number;
    image: string;
    name: string;
    description: string;
    productArr: number[];
    hasSubCategory :boolean;
    subCategory: ISubCategory[];
}
export interface ISubCategory {
    _id?: string;
    id: number;
    image: string;
    name: string;
    show_type: string;
    description: string;
    productArr: IProduct[];
}