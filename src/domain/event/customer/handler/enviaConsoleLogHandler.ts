import { EventHandlerInterface } from "../../@shared/eventHandlerInterface";
import { EventInterface } from "../../@shared/eventInterface";
import { AddressChangedEvent } from "../addressChangedEvent";

export class EnviaAddressConsoleLogHandler implements EventHandlerInterface <AddressChangedEvent> {
    handle(event: EventInterface): void {
        console.log(`Endereço do cliente ${event.eventData.customerId}, ${event.eventData.customerName} alterado para: 
            ${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.city}`);
    }
}