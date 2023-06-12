import { OrderItem } from "../domain/entity/orderItem";

describe("OrderItem Unit Tests", () => {
    it("should return error if the qty less than one ", () => {
        expect (() => {
            const orderItem = new OrderItem("123", "Item 1", 100, "999", 0);
        }).toThrowError("At least one product quantity must be informed")
    })

    it("should return error if the productID is empty", () => {
        expect (() => {
            const orderItem = new OrderItem("123", "Item 1", 100, "", 1);
        }).toThrowError("ProductID must be informed")
    })

    it("should return error if the price less than one ", () => {
        expect (() => {
            const orderItem = new OrderItem("123", "Item 1", 0, "999", 1);
        }).toThrowError("Price must be greater than zero")
    })

    it("should return price", () => {

        const orderItem = new OrderItem("123", "Item 1", 100, "958", 2);

        expect(orderItem.price).toBe(100);
    })

    it("should return quantity", () => {
        const orderItem = new OrderItem("123", "Item 1", 100, "958", 2);
        expect(orderItem.quantity).toBe(2);
    })
})