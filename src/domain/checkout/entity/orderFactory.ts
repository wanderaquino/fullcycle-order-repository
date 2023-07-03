import { Order } from "./order";
import { OrderInterface } from "./orderInterface";
import { OrderItem } from "./orderItem";
import {v4 as uuid} from "uuid"


interface OrderItemProps {
    id : string;
    name : string;
    price : number;
    productId : string;
    quantity : number;
}
export class OrderFactory {
    public static create (customerId: string, orderItems: OrderItemProps[]) : OrderInterface {
        const items = orderItems.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
        return new Order(uuid(),customerId, items);
    }
}