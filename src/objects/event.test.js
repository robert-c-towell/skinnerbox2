import Event, { EventTypes } from "./event.js";
// TODO: use fake classes to remove some of the boiler plate
import { v4 as uuidv4 } from 'uuid';

describe("Event object", () => {
    let event;

    beforeEach(() => {
        event = new Event(EventTypes.INPUT, "Message");
    });

    test("should create an Event", () => {
        expect(event).toBeTruthy();
        expect(event).toBeInstanceOf(Event);
    });

    test("should require a valid type", () => {
        expect(() => new Event()).toThrow();
        expect(() => new Event("Some non-type")).toThrow();
    });

    test("should require message, and it should be a string", () => {
        expect(() => new Event(EventTypes.INPUT)).toThrow();
        expect(() => new Event(EventTypes.INPUT, 2)).toThrow();
        expect(() => new Event(EventTypes.INPUT, { a: 1 })).toThrow();
    });

    test("should required broadcastMessage to be a string", () => {
        expect(() => new Event(EventTypes.INPUT, "Message", 2)).toThrow();
        expect(() => new Event(EventTypes.INPUT, "Message", { a: 1 })).toThrow();
    });

    test("should require conditions to be an array", () => {
        expect(() => new Event(EventTypes.INPUT, "Message", undefined, { a: 1 })).toThrow();
        expect(() => new Event(EventTypes.INPUT, "Message", undefined, [1,2])).toBeTruthy();
    });

    test("should require effects to be an array", () => {
        expect(() => new Event(EventTypes.INPUT, "Message", undefined, [1,2], { a: 1 })).toThrow();
        expect(() => new Event(EventTypes.INPUT, "Message", undefined, [1,2], [1,2])).toBeTruthy();
    });

    test("getSettableProps should return an empty object", () => {
        let props = event.getSettableProps();
        expect(props).toBeTruthy();
        expect(event).toMatchObject(props);
        expect(props).toMatchObject({});
    });
});