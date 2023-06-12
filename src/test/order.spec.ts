import { Order } from "../domain/entity/order";

describe("Order unit Tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("", "123", []);
        }).toThrowError("Id is mandatory")
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            const order = new Order("123", "", []);
        }).toThrowError("CustomerId is mandatory")
    });
    
    it("should throw error when orderitem is empty", () => {
        expect(() => {
            const order = new Order("123", "123", []);
        }).toThrowError("At least one product must be included")
    });
}
)