import { Product } from "../domain/product/entity/product";

describe("Product unit Tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product One", 4);
        }).toThrowError("ID is mandatory")
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123456", "", 4);
        }).toThrowError("Name is mandatory")
    });

    it("should throw error when price is equal zero", () => {
        expect(() => {
            const product = new Product("123456", "Product One", 0);
        }).toThrowError("Price must be greater than zero")
    })

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("123456", "Product One", -1);
        }).toThrowError("Price must be greater than zero")
    })

    it("should change product name", () => {
        const product = new Product("123456", "Product One", 4);
        product.changeName("Product Two");
        expect(product.name).toBe("Product Two")
    })

    it("should change product price", () => {
        const product = new Product("123456", "Product One", 4);
        product.changePrice(5);
        expect(product.price).toBe(5);
    })
}
)