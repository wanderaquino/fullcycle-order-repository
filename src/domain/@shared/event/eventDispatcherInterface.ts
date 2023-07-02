import { EventHandlerInterface } from "./eventHandlerInterface";
import { EventInterface } from "./eventInterface";

export interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, eventHandlerInterface : EventHandlerInterface): void;
    unregister(eventName: string, eventHandlerInterface : EventHandlerInterface): void
    unregisterAll(): void;
}