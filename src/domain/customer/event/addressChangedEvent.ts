import { EventInterface } from "../../@shared/eventInterface";

export class AddressChangedEvent implements EventInterface{
    dateTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}