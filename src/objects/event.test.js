import Event, { EventTypes } from "./event.js";
// TODO: use fake classes to remove some of the boiler plate

describe("Event object", () => {
    let event;
    let id = "12";

    beforeEach(() => {
        event = new Event(id, EventTypes.INPUT, [], []);
    });

    test("should create an Event", () => {
        expect(event).toBeTruthy();
        expect(event).toBeInstanceOf(Event);
    });

    test("should require a valid id", () => {
        expect(() => new Event()).toThrow();
        expect(() => new Event(null)).toThrow();
    });

    test("should require a valid type", () => {
        expect(() => new Event(id, "Some non-type")).toThrow();
        expect(() => new Event(id, EventTypes.INPUT, [], [])).toBeTruthy();
    });

    test("should require conditions to be an array", () => {
        expect(() => new Event(id, EventTypes.INPUT)).toThrow();
        expect(() => new Event(id, EventTypes.INPUT, { a: 1 })).toThrow();
        expect(() => new Event(id, EventTypes.INPUT, [1,2])).toBeTruthy();
    });

    test("should require effects to be an array", () => {
        expect(() => new Event(id, EventTypes.INPUT, [])).toThrow();
        expect(() => new Event(id, EventTypes.INPUT, [1,2], { a: 1 })).toThrow();
        expect(() => new Event(id, EventTypes.INPUT, [1,2], [1,2])).toBeTruthy();
    });

    test("create() should create an Event", () => {
        event = Event.create({
            id: id,
            type: EventTypes.INPUT,
            conditions: [],
            effects: []
        });
        expect(event).toBeTruthy();
        expect(event).toBeInstanceOf(Event);
    });

    test("getSettableProps() should return an empty object", () => {
        let props = event.getSettableProps();
        expect(props).toBeTruthy();
        expect(event).toMatchObject(props);
        expect(props).toMatchObject({});
    });
});