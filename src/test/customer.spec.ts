import { Address } from "../domain/entity/address";
import { Customer } from "../domain/entity/customer"

describe("Customer unit Tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Charles Nelson");
        }).toThrowError("ID is mandatory");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Customer name is mandatory");
    })

    it("should can change customer name ", () => {

        let customer = new Customer("123", "Charles Albert");
        customer.changeName("Charles Nelson");
        expect(customer.name).toBe("Charles Nelson");
    })

    it("should activate customer", () => {

        let customer = new Customer("123", "Charles Albert");
        const address = new Address("Rua Backer Alfred", 123, "24452005", "Rio de Janeiro", "Brasil");
        customer.changeAddress(address);
        customer.activate(true);
        expect(customer.isActive()).toBe(true);
        
    })

    it("should deactivate customer", () => {

        let customer = new Customer("123", "Charles Albert");
        const address = new Address("Rua Backer Alfred", 123, "24452005", "Rio de Janeiro", "Brasil");
        customer.changeAddress(address);
        customer.activate(false);
        expect(customer.isActive()).toBe(false);
        
    })

    it("should throw error when don't have customer address", () => {
        expect(() => {
            let customer = new Customer("123", "Charles Albert");
            customer.activate(true);
        }).toThrowError("Address is mandatory");        
    })
})