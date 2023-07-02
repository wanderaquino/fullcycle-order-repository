import { v4 as uuid  } from "uuid";
import { Sequelize } from "sequelize-typescript"
import { Customer } from "../domain/customer/entity/customer";
import { CustomerModel } from "../infrastructure/customer/repository/sequelize/customerModel";
import { CustomerRepository } from "../infrastructure/customer/repository/sequelize/customerRepository";
import { Address } from "../domain/customer/value-object/address";

describe("CustomerRepository unit tests", () => {

    let sequelize: Sequelize;
    const customerRepository = new CustomerRepository();

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage:":memory:",
            logging: false,
            sync: {force:true}
        })

        sequelize.addModels([CustomerModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const customerId = uuid();
        const customer = new Customer(customerId, "Charles Nelson");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: customerId}});

        expect(customerModel?.toJSON()).toStrictEqual({
            id: customerId,
            name: "Charles Nelson",
            active: false,
            city: "Rio de Janeiro",
            street: "Rua 1",
            number: 123,
            zipcode: "24452005",
            country: "Brasil",
            rewardPoints: 0
        })
    })

    it("should update a customer name", async () => {
        const customerId = uuid();
        const customer = new Customer(customerId, "Charles Albert");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeName("Charles Silva");
        await customerRepository.update(customer);
        const customerUpdated = await customerRepository.find(customer.id);

        expect({
            id: customerUpdated.id,
            name: customerUpdated.name,
            active: false,
            city: customerUpdated.address.city,
            street: customerUpdated.address.street,
            number: customerUpdated.address.number,
            zipcode: customerUpdated.address.zip,
            country: customerUpdated.address.country,
            rewardPoints: customerUpdated.getRewardPoints()
        }).toStrictEqual({
            id: customerId,
            name: "Charles Silva",
            active: false,
            city: "Rio de Janeiro",
            street: "Rua 1",
            number: 123,
            zipcode: "24452005",
            country: "Brasil",
            rewardPoints: 0
        })
    })


    it("should update a customer address", async () => {
        const id = uuid();
        const customer = new Customer(id, "Charles Albert");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        const newAddress = new Address ("Rua 2", 123, "24452005", "São Paulo", "Brasil");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeAddress(newAddress);
        await customerRepository.update(customer);
        const customerUpdated = await customerRepository.find(customer.id);

        expect({
            id: customerUpdated.id,
            name: customerUpdated.name,
            active: false,
            city: customerUpdated.address.city,
            street: customerUpdated.address.street,
            number: customerUpdated.address.number,
            zipcode: customerUpdated.address.zip,
            country: customerUpdated.address.country,
            rewardPoints: customerUpdated.getRewardPoints()
        }).toStrictEqual({
            id,
            name: "Charles Albert",
            active: false,
            city: "São Paulo",
            street: "Rua 2",
            number: 123,
            zipcode: "24452005",
            country: "Brasil",
            rewardPoints: 0
        })
    })

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customerId = uuid();
        const customer = new Customer(customerId, "Charles Albert");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        customer.changeAddress(address);
        customerRepository.create(customer);

        const customerResponse = await customerRepository.find(customerId);

        expect({
            id: customerResponse.id,
            name: customerResponse.name,
            active: false,
            city: customerResponse.address.city,
            street: customerResponse.address.street,
            number: customerResponse.address.number,
            zipcode: customerResponse.address.zip,
            country: customerResponse.address.country,
            rewardPoints: customerResponse.getRewardPoints()
        }).toStrictEqual({
            id: customerId,
            name: "Charles Albert",
            active: false,
            city: "Rio de Janeiro",
            street: "Rua 1",
            number: 123,
            zipcode: "24452005",
            country: "Brasil",
            rewardPoints: 0
        })
    })

    it("should throw an error when try to find a unknown customer", async () => {
        expect(async () => {
            await customerRepository.find("123");
        }).rejects.toThrowError("Customer not found")
    })

    it("should return an empty array when try to find an empty table", async () => {
        const response = await customerRepository.findAll();

        expect(response).toStrictEqual([])
    })

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const id = uuid();
        const customer = new Customer(id, "Charles Albert");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        customer.changeAddress(address);

        const customers = [customer];
        
        
        customers.forEach(async customer => {
            await customerRepository.create(customer);        
        })

        const customerResponse = await customerRepository.findAll();

        expect(customerResponse).toEqual(customers);
    })
})