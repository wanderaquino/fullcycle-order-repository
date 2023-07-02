import {v4 as uuid} from "uuid";
import { Customer } from "../domain/customer/entity/customer";
import { EventDispatcher } from "../domain/@shared/event/eventDispatcher";
import { EnviaConsoleLog1Handler } from "../domain/customer/event/handler/enviaConsoleLog1Handler";
import { EnviaConsoleLog2Handler } from "../domain/customer/event/handler/enviaConsoleLog2Handler";
import { Address } from "../domain/customer/value-object/address";
import { EnviaAddressConsoleLogHandler } from "../domain/customer/event/handler/enviaConsoleLogHandler";
import { CustomerCreatedEvent } from "../domain/customer/event/customerCreatedEvent";
import { AddressChangedEvent } from "../domain/customer/event/addressChangedEvent";


describe("Customer Event dispatcher tests", () => {
    it("Should register events when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerLog1 = new EnviaConsoleLog1Handler();
        const eventHandlerLog2 = new EnviaConsoleLog2Handler();
        const customer = new Customer(uuid(),"Jose Alves");

        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog2);

        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerLog1);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerLog2);    
    })

    it("Should unregister customer events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerLog1 = new EnviaConsoleLog1Handler();
        const eventHandlerLog2 = new EnviaConsoleLog2Handler();
        const customer = new Customer(uuid(),"Jose Alves");

        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog2);

        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerLog1);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerLog2);  

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerLog1);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerLog2);

        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toStrictEqual([]);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(0);
    });

    it("Should unregister all customer events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerLog1 = new EnviaConsoleLog1Handler();
        const eventHandlerLog2 = new EnviaConsoleLog2Handler();
        const customer = new Customer(uuid(),"Jose Alves");

        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog2);

        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerLog1);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerLog2);  

        eventDispatcher.unregisterAll();

        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined;
    });

    it("Should notify when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerLog1 = new EnviaConsoleLog1Handler();
        const eventHandlerLog2 = new EnviaConsoleLog2Handler();
        const customer = new Customer(uuid(),"Jose Alves");
        const spyHander1 = jest.spyOn(eventHandlerLog1, "handle");
        const spyHander2 = jest.spyOn(eventHandlerLog2, "handle");


        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog2);

        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerLog1);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerLog2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Jose Aldo"
        })

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyHander1).toHaveBeenCalled();
        expect(spyHander2).toHaveBeenCalled();
        expect(spyHander1).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyHander2).toHaveBeenCalledWith(customerCreatedEvent);

    });

    it("Should register events when address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerLog1 = new EnviaConsoleLog1Handler();
        const eventHandlerLog2 = new EnviaConsoleLog2Handler();
        const eventHandlerLog = new EnviaAddressConsoleLogHandler();
        
        const customer = new Customer(uuid(),"Jose Alves");

        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog2);

        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerLog1);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerLog2);

        const address = new Address("Rua Jose Charles Nelson",4321, "24452005","Rio de Janeiro", "Brasil");
        customer.changeAddress(address);

        eventDispatcher.register("AddressChanged", eventHandlerLog);

        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toHaveLength(1);
        expect (eventDispatcher.getEventHandlers["AddressChanged"][0]).toMatchObject(eventHandlerLog);
          
    })

    it("Should unregister address events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerLog1 = new EnviaConsoleLog1Handler();
        const eventHandlerLog2 = new EnviaConsoleLog2Handler();
        const eventHandlerLog = new EnviaAddressConsoleLogHandler();
        
        const customer = new Customer(uuid(),"Jose Alves");

        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandlerLog2);

        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerLog1);
        expect (eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerLog2);

        const address = new Address("Rua Jose Charles Nelson",4321, "24452005","Rio de Janeiro", "Brasil");

        customer.changeAddress(address);
        eventDispatcher.register("AddressChanged", eventHandlerLog);

        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toHaveLength(1);
        expect (eventDispatcher.getEventHandlers["AddressChanged"][0]).toMatchObject(eventHandlerLog);

        eventDispatcher.unregister("AddressChanged", eventHandlerLog);

        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toStrictEqual([])
        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toHaveLength(0);
          
    });


    it("Should unregister all address events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerLog = new EnviaAddressConsoleLogHandler();
        const customer = new Customer(uuid(),"Jose Alves");
        const address = new Address("Rua Jose Charles Nelson",4321, "24452005","Rio de Janeiro", "Brasil");

        customer.changeAddress(address);

        eventDispatcher.register("AddressChanged", eventHandlerLog);

        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toHaveLength(1);
        expect (eventDispatcher.getEventHandlers["AddressChanged"][0]).toMatchObject(eventHandlerLog);

        eventDispatcher.unregister("AddressChanged", eventHandlerLog);

        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toStrictEqual([])
        expect (eventDispatcher.getEventHandlers["AddressChanged"]).toHaveLength(0);
    });

    it("Should notify when customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaAddressConsoleLogHandler();
        const customer = new Customer(uuid(),"Jose Alves");
        const spyHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent",eventHandler);

        expect (eventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeDefined();
        expect (eventDispatcher.getEventHandlers["AddressChangedEvent"]).toHaveLength(1);
        expect (eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(eventHandler);

        const address = new Address("Rua Jose Charles Nelson",4321, "24452005","Rio de Janeiro", "Brasil");

        const addressChangedEvent = new AddressChangedEvent({
            customerId: customer.id,
            customerName: customer.name,
            address: {
                street: address.street,
                number: address.number,
                city: address.city
            }
        })

        eventDispatcher.notify(addressChangedEvent);

        expect(spyHandler).toHaveBeenCalledWith(addressChangedEvent);
    });
})