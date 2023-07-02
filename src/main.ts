import {Customer} from "./domain/customer/entity/customer";
import {Address} from "./domain/customer/value-object/address";
import { OrderItem } from "./domain/checkout/entity/orderItem";
import { Order } from "./domain/checkout/entity/order";

let customer = new Customer("123", "Wander Aquino");
const address = new Address("Rua Dr Backer Alfred", 458, "24452005", "Rio de Janeiro", "Brasil");
const orderItem = new OrderItem("123", "Item 01", 1699, "123", 5);
const orderItem2 = new OrderItem("123", "Item 02", 1099, "123", 5);
const order = new Order("123","999",[orderItem, orderItem2]);

customer.changeAddress(address);
customer.activate(true);
console.log("customer: ", customer);
console.log("order: ", order);



