import { CustomerFactory } from "../domain/customer/entity/customerFactory"

describe("Customer Factory unit tests", () => {
    it("Should create a customer", () => {
        const customer = CustomerFactory.create("Jose Alves");
        expect(customer).toBeDefined();
        expect(customer.name).toBe("Jose Alves");
    })

    it("Should create a customer with address", () => {
        const customerAddress = {
            street: "Rua Um",
            number: 25,
            zip: "24452-005",
            country: "Brasil",
            city: "Rio de Janeiro"
        }
        const customer = CustomerFactory.createWithAddress("Jose Alves", customerAddress);
        expect(customer).toBeDefined();
        expect(customer.name).toBe("Jose Alves");
        expect(customer.address.street).toStrictEqual(customerAddress.street);
        expect(customer.address.zip).toStrictEqual(customerAddress.zip);
        expect(customer.address.city).toStrictEqual(customerAddress.city);
        expect(customer.address.country).toStrictEqual(customerAddress.country);

    })
})