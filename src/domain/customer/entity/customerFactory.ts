import { Customer } from "./customer";
import {v4 as uuid} from "uuid";
import { CustomerInterface } from "./customerInterface";
import { Address } from "../value-object/address";

interface AddressProps {
    street: string ;
    number: number;
    zip: string;
    city: string ;
    country: string;
}

export class CustomerFactory {
    public static create(customerName: string) : CustomerInterface {
        return new Customer(uuid(),customerName);
    }

    public static createWithAddress(customerName: string, customerAddress : AddressProps) : CustomerInterface {
        const customer = new Customer(uuid(), customerName);
        const address = new Address(customerAddress.street, customerAddress.number, customerAddress.zip, customerAddress.city, customerAddress.country);
        customer.changeAddress(address);
        
        return customer; 
    }
}