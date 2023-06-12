import { Product } from "../entity/product";
import { ProductService } from "./productService";

describe("ProducService Unit Tests", () => {
    it("Should change the prices of all products", () => {
        const products = [];
        const productOne = new Product("ProductOne", "Product 1", 10);
        const productTwo = new Product("ProductTwo", "Product 2", 50);
        products.push(productOne, productTwo);

        ProductService.IncreasePrice(products, 100);

        expect(productOne.price).toBe(20);
        expect(productTwo.price).toBe(100);
    })
})