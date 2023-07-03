import { BProduct } from "./bProduct";
import { Product } from "./product";
import {v4 as uuid} from "uuid";
import { ProductInterface } from "./productInterface";

export class ProductFactory {
    public static create(productType: string, productName: string, productPrice: number) : ProductInterface {

        switch(productType) {
            case "A" :
                return new Product(uuid(), productName, productPrice);
            case "B" :
                return new BProduct(uuid(), productName, productPrice);
            default : 
                throw new Error("Product type not supported");
        } 
    }
}