import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/orderItem"
import { OrderService } from "./orderService";
import {v4 as uuid} from "uuid";


describe("OrderService unit tests", () => {
    it("Should throw new error when items size is less than one", () => {
        expect(() => {
            OrderService.placeOrder(new Customer(uuid(), "Customer Charles"), [])
        }).toThrowError("At least one item must be informed");
    });

    it("Should get total of all orders", () => {
        const orderItem01 = new OrderItem("Item01", "Item 01", 100, "p1", 1);   
        const orderItems02 = new OrderItem("Item02", "Item 02", 200, "p2", 1);

        const order = new Order("order01", "123", [orderItem01]);
        const order02 = new Order("order02", "455", [orderItems02]);

        const total = OrderService.total([order, order02]);

        expect(total).toBe(300);
    });

    it("Should apply reward points to customer", () => {
        const orderItem01 = new OrderItem("Item01", "Item 01", 100, "p1", 1);   
        const orderItems02 = new OrderItem("Item02", "Item 02", 200, "p2", 1);
        const customer = new Customer(uuid(), "Customer Charles");

        const order = OrderService.placeOrder(customer, [orderItem01, orderItems02]);

        expect(customer.getRewardPoints()).toBe(150);
    })
})