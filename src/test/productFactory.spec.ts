import { ProductFactory } from "../domain/product/entity/productFactory"

describe("Product Factory unit tests", () => {
    it("should create type A product", () => {
        const product = ProductFactory.create("A", "Product A", 2000);
        expect(product).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(2000);
    });

    it("should create type B product", () => {
        const product = ProductFactory.create("B", "Product A", 2000);
        expect(product).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(4000);
    })

    it("should throw error when product type is not supported", () => {
        expect( () => ProductFactory.create("C", "Product A", 2000)
        ).toThrowError("Product type not supported")
    })
})