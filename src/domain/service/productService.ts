import { Product } from "../entity/product";

export class ProductService {
    static IncreasePrice(products: Product[], amount: number): void {
        products.forEach( 
            (product) => product.changePrice(
                product.price + ((product.price * amount)/100)));
    }
}