import { Address } from "../domain/entity/address"

describe("Address unit tests", () => {
    it("should create and andress", () => {
        const address = new Address("Rua 10", 65, "24452005", "Rio de Janeiro", "Brasil");
        expect({
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            country: address.country,
            active: address.isActive()
        }).toStrictEqual({
            street: "Rua 10",
            number: 65,
            zipcode: "24452005",
            city: "Rio de Janeiro",
            country: "Brasil",
            active: false
        });
    })

    it("should return an error when street is empty", () => {
        expect(() =>  {
            const address = new Address("", 65, "24452005", "Rio de Janeiro", "Brasil");
        }
        ).toThrowError("Street is required");
    });
    it("should return an error when city is empty", () => {
        expect(() =>  {
            const address = new Address("Rua 02", 65, "24452005", "", "Brasil");
        }
        ).toThrowError("City is required");
    });

    it("should return an error when number is invalid", () => {
        expect(() =>  {
            const address = new Address("Rua 02", -0, "24452005", "Rio de Janeiro", "Brasil");
        }
        ).toThrowError("Number is required");
    });

    it("should return an error when number is invalid", () => {
        expect(() =>  {
            const address = new Address("Rua 02", 100, "", "Rio de Janeiro", "Brasil");
        }
        ).toThrowError("Zip is required");
    });

    it("should return an error when country is invalid", () => {
        expect(() =>  {
            const address = new Address("Rua 02", 100, "24452005", "Rio de Janeiro", "");
        }
        ).toThrowError("Country is required");
    });

    it("should activate and andress", () => {
        const address = new Address("Rua 10", 65, "24452005", "Rio de Janeiro", "Brasil");
        address.activate();
        expect({
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            country: address.country,
            active: address.isActive()
        }).toStrictEqual({
            street: "Rua 10",
            number: 65,
            zipcode: "24452005",
            city: "Rio de Janeiro",
            country: "Brasil",
            active: true
        });
    })

})