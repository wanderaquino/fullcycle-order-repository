import { EventDispatcherInterface } from "./eventDispatcherInterface";
import { EventHandlerInterface } from "./eventHandlerInterface";
import { EventInterface } from "./eventInterface";

export class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: {[eventName: string]: EventHandlerInterface[]} = {};

    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if(this.eventHandlers[eventName]){
            this.eventHandlers[eventName].forEach(eventHandler => {
                eventHandler.handle(event)
            })
        }
    }
    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }
    unregister(eventName: string, eventHandlerInterface: EventHandlerInterface<EventInterface>): void {

        const eventHandlerIndex = this.eventHandlers[eventName].indexOf(eventHandlerInterface);

        if(eventHandlerIndex !== -1) {
            this.eventHandlers[eventName].splice(eventHandlerIndex, 1);
        }

    }
    unregisterAll(): void {
        this.eventHandlers = {}
    }

}