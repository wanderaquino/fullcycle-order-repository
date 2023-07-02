import { EventHandlerInterface } from "../../@shared/eventHandlerInterface";
import { ProductCreatedEvent } from "../productCreatedEvent";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface <ProductCreatedEvent>{

    handle(event: ProductCreatedEvent): void {
        console.log(`Sending mail to ${event.eventData.email}`);
    }
    
}