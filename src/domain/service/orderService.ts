import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/orderItem";
import {v4 as uuid} from "uuid";

export class OrderService {
     
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => {
            return (acc + order.total());
        }, 0)
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if(items.length < 1) {
            throw Error("At least one item must be informed");
        }
        const order = new Order(uuid(), customer.id, items);
        const rewardPoints = order.total() / 2;

        customer.addRewardPoints(rewardPoints);

        return order;
    }


}