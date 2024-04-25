import { Product } from "./product";

export interface ObjCart {
    selected?:boolean;
    count:number;
    product:Product;
}
