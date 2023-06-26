import { EventHandlerInterface } from "../../@shared/eventHandlerInterface";
import { EventInterface } from "../../@shared/eventInterface";

export class EnviaAddressConsoleLogHandler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log(`Endereço do cliente ${event.eventData.customerId}, ${event.eventData.customerName} alterado para: 
            ${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.city}`);
    }
}