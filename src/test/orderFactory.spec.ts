import { OrderFactory } from "../domain/checkout/entity/orderFactory"
import {v4 as uuid} from "uuid";

describe("Order factory unit tests", () => {
    it("should create an order", () => {

        const item = [{
            id : uuid(),
            name : "Item one",
            price : 2000,
            productId : uuid(),
            quantity : 2
        },
        {
            id : uuid(),
            name : "Item two",
            price : 1000,
            productId : uuid(),
            quantity : 2
        }]

        const order = OrderFactory.create(uuid(), item);

        expect(order).toBeDefined();
        expect(order.total()).toBe(6000);
        expect(order.orderItems.length).toBe(2);
    })
})