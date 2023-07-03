import { Address } from "../value-object/address";

export interface CustomerInterface {

    get address () : Address;

    get name() : string;

    get id() : string
    
    get active () : boolean
}