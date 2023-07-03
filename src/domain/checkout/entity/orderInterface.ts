import { OrderItem } from "./orderItem";

export interface OrderInterface {
    get id () : string

    get customerId(): string

    get orderItems() : OrderItem[]

    total(): number

}