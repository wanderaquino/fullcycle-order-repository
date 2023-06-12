import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../infrastructure/db/sequelize/model/customerModel";
import { OrderModel } from "../infrastructure/db/sequelize/model/orderModel";
import { ProductModel } from "../infrastructure/db/sequelize/model/productModel";
import { OrderItemModel } from "../infrastructure/db/sequelize/model/orderItemModel";
import { CustomerRepository } from "../infrastructure/repository/customerRepository";
import { Customer } from "../domain/entity/customer";
import { Address } from "../domain/entity/address";
import { ProductRepository } from "../infrastructure/repository/productRepository";
import { Product } from "../domain/entity/product";
import { OrderItem } from "../domain/entity/orderItem";
import { Order } from "../domain/entity/order";
import { OrderRepository } from "../infrastructure/repository/orderRepository";
import {v4 as uuid} from "uuid";

describe("orderRepository Tests", () => {
    let sequelize : Sequelize;
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a new order", async () => {
        const orderId = uuid();
        const customerId = uuid();
        const productId = uuid();
        const orderItemId = uuid();

        const customer = new Customer(customerId, "Cliente 01");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        const product = new Product(productId, "Produto 01", 1999);

        customer.changeAddress(address);
        await customerRepository.create(customer);
        await productRepository.create(product);

        const orderItem = new OrderItem(orderItemId,product.name,product.price,product.id,3);

        const order = new Order(orderId, customerId, [orderItem]);
        expect(async () => {
            await orderRepository.create(order);
        }).resolves;
    });

    it("Should find an order", async () => {
        const orderId = uuid();
        const customerId = uuid();
        const productId = uuid();
        const orderItemId = uuid();

        const customer = new Customer(customerId, "Cliente 01");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        const product = new Product(productId, "Produto 01", 1999);

        customer.changeAddress(address);
        await customerRepository.create(customer);
        await productRepository.create(product);

        const orderItem = new OrderItem(orderItemId,product.name,product.price,product.id,3);

        const order = new Order(orderId, customerId, [orderItem]);
        await orderRepository.create(order);

        const orderResponse = await orderRepository.find(orderId);

        expect(orderResponse).toStrictEqual(order);
    })


    it("Should throw an error when an order not found", async () => {
        const orderId = uuid();
        const customerId = uuid();
        const productId = uuid();
        const orderItemId = uuid();

        const customer = new Customer(customerId, "Cliente 01");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        const product = new Product(productId, "Produto 01", 1999);

        customer.changeAddress(address);
        await customerRepository.create(customer);
        await productRepository.create(product);

        const orderItem = new OrderItem(orderItemId,product.name,product.price,product.id,3);

        const order = new Order(orderId, customerId, [orderItem]);
        await orderRepository.create(order);


        expect(async () => {
            await orderRepository.find("100");
        }).rejects.toThrowError("Order not found")
    })

    it("Should find all orders", async () => {
        const orderId = uuid();
        const customerId = uuid();
        const productId = uuid();
        const orderItemId = uuid();

        const customer = new Customer(customerId, "Cliente 01");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        const product = new Product(productId, "Produto 01", 1999);

        customer.changeAddress(address);
        await customerRepository.create(customer);
        await productRepository.create(product);

        const orderItem = new OrderItem(orderItemId,product.name,product.price,product.id,3);

        const order = new Order(orderId, customerId, [orderItem]);
        await orderRepository.create(order);

        const orderResponse = await orderRepository.findAll();
        
        expect(orderResponse).toStrictEqual([order]);
    });

    it("Should return an empty array of orders", async () => {
        const orderResponse = await orderRepository.findAll();
        
        expect(orderResponse).toStrictEqual([]);
    });

    it("Should update an order", async () => {
        const orderId = uuid();
        const customerId = uuid();
        const productId = uuid();
        const orderItemId = uuid();

        const customer = new Customer(customerId, "Cliente 01");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        const product = new Product(productId, "Produto 01", 1999);
        customer.changeAddress(address);
        await customerRepository.create(customer);
        await productRepository.create(product);

        const orderItem = new OrderItem(orderItemId,product.name,product.price,product.id,3);

        const order = new Order(orderId, customerId, [orderItem]);
        await orderRepository.create(order);
        const orderResponse = await orderRepository.find(order.id);
        expect(orderResponse).toStrictEqual(order);
        
        product.changeName("Produto Alterado");
        product.changePrice(2000);
        
        await productRepository.update(product);       
        
        const updatedOrderItem = new OrderItem(orderItemId, product.name, product.price, product.id, 2);
        const updatedOrder = new Order(orderId, customerId, [updatedOrderItem]);
        await orderRepository.update(updatedOrder);
        
        const updatedOrderResponse = await orderRepository.find(order.id);
        expect(updatedOrderResponse).toStrictEqual(updatedOrder);
    })

    it("Should throw an error when try to update an order", async () => {
        const orderId = uuid();
        const customerId = uuid();
        const productId = uuid();
        const orderItemId = uuid();

        const customer = new Customer(customerId, "Cliente 01");
        const address = new Address("Rua 1", 123, "24452005", "Rio de Janeiro", "Brasil");
        const product = new Product(productId, "Produto 01", 1999);
        customer.changeAddress(address);
        await customerRepository.create(customer);
        await productRepository.create(product);

        const orderItem = new OrderItem(orderItemId,product.name,product.price,product.id,3);

        const order = new Order(orderId, customerId, [orderItem]);
        await orderRepository.create(order);
        const orderResponse = await orderRepository.find(order.id);
        expect(orderResponse).toStrictEqual(order);
        
        product.changeName("Produto Alterado");
        product.changePrice(2000);
        
        await productRepository.update(product);       
        
        const updatedOrderItem = new OrderItem(orderItemId, product.name, product.price, product.id, 2);
        const updatedOrder = new Order("orderId", customerId, [updatedOrderItem]);

        await expect(async () => {
            await orderRepository.update(updatedOrder);
        }).rejects.toThrowError("Error on update");
    })
})