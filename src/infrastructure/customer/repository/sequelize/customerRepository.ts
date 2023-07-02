import { Address } from "../../../../domain/customer/value-object/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repository/customerRepositoryInterface";
import { CustomerModel } from "./customerModel";

export class CustomerRepository implements CustomerRepositoryInterface {
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            city: entity.address.city,
            zipcode: entity.address.zip,
            active: entity.isActive(),
            country: entity.address.country,
            rewardPoints: entity.getRewardPoints()
        }, {where: {id: entity.id}})
    }

    async find(id: string): Promise<Customer> {
        try {
            const customerResponse = await CustomerModel.findOne({
                where: {id},
                rejectOnEmpty: true
            });
            const formattedCustomer = new Customer(customerResponse.id, customerResponse.name);
            formattedCustomer.changeAddress(
                new Address(    
                    customerResponse.street, 
                    customerResponse.number, 
                    customerResponse.zipcode, 
                    customerResponse.city, 
                    customerResponse.country
                )
            );

            return formattedCustomer;
        } catch (error) {
            throw Error("Customer not found");
        }
    }

    async findAll(): Promise<Customer[]> {
        
        const customers = await CustomerModel.findAll();
        if(customers) {
            return customers.map(customer => {
                const customerResponse = new Customer(customer.id, customer.name);
                customerResponse.addRewardPoints(customer.rewardPoints);
                customerResponse.changeAddress(
                    new Address(
                        customer.street, 
                        customer.number, 
                        customer.zipcode, 
                        customer.city, 
                        customer.country))
                return customerResponse;
        })
    }
        return []
    }

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            city: entity.address.city,
            zipcode: entity.address.zip,
            country: entity.address.country,
            active: entity.isActive(),
            rewardPoints: entity.getRewardPoints()
        });
    }
}