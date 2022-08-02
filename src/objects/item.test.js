import Item from "./item.js";
// TODO: use fake classes to remove some of the boiler plate
import { v4 as uuidv4 } from 'uuid';

describe("Item object", () => {
    let item;
    let state;

    beforeEach(() => {
        state = {
            id: uuidv4(),
            name: "",
            description: ""
        }
        item = new Item(undefined, "Name", undefined, undefined, state.id, [state]);
    });

    test("constructor() should create an Item", () => {
        expect(item).toBeTruthy();
        expect(item).toBeInstanceOf(Item);
    });

    test("constructor() should require name to be a string", () => {
        expect(() => new Item(uuidv4(), {}, 1, null, null)).toThrow();
        expect(() => new Item(uuidv4(), null, 1, null, null)).toThrow();
    });

    test("constructor() should require state to be a string", () => {
        expect(() => new Item(uuidv4(), "Name", 1, null, {})).toThrow();
        expect(() => new Item(uuidv4(), "Name", 1, null, null)).toThrow();
    });

    test("consturctor() should require states to be a list of objects", () => {
        expect(() => new Item(uuidv4(), "Name", 1, null, state.id, {})).toThrow();
        expect(() => new Item(uuidv4(), "Name", 1, null, state.id, null)).toThrow();
    });

    test("create() should turn json into an Item", () => {
        let json = {
            id: uuidv4(),
            name: "item",
            size: 10,
            state: state.id,
            states: [state],
            events: null
        };
        let item = Item.create(json)
        expect(item).toBeTruthy();
        expect(item).toBeInstanceOf(Item);
    });

    test("getSettableProps() should return an object subset of the Item", () => {
        let props = item.getSettableProps();
        expect(props).toBeTruthy();
        expect(item).toMatchObject(props);
    });
});

