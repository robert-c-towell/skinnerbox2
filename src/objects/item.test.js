import Item from "./item.js";
import Inventory from "./inventory.js";
// TODO: use fake classes to remove some of the boiler plate
import { v4 as uuidv4 } from 'uuid';

describe("Item object", () => {
    let item;
    let inventory;
    let state;

    beforeEach(() => {
        inventory = new Inventory(Item);
        state = {
            id: uuidv4(),
            name: "",
            description: ""
        }
        item = new Item(undefined, "Name", undefined, undefined, state.id, [state]);
    });

    test("should create an Item", () => {
        expect(item).toBeTruthy();
        expect(item).toBeInstanceOf(Item);
    });

    test("should be able to initialize an Item with an Inventory", () => {
        item = new Item(uuidv4(), "Name", 1, inventory, state.id, [state]);
        expect(item.inventory).toBeInstanceOf(Inventory);
    });

    test("should not allow non-Inventory objects to be referenced by inventory", () => {
        expect(() => new Item(uuidv4(), "Name", 1, {})).toThrow();
    });

    test("should require name to be a string", () => {
        expect(() => new Item(uuidv4(), {}, 1, null, null)).toThrow();
        expect(() => new Item(uuidv4(), null, 1, null, null)).toThrow();
    });

    test("should require state to be a string", () => {
        expect(() => new Item(uuidv4(), "Name", 1, null, {})).toThrow();
        expect(() => new Item(uuidv4(), "Name", 1, null, null)).toThrow();
    });

    test("should require states to be a list of objects", () => {
        expect(() => new Item(uuidv4(), "Name", 1, null, state.id, {})).toThrow();
        expect(() => new Item(uuidv4(), "Name", 1, null, state.id, null)).toThrow();
    });

    test("getSettableProps should return an object subset of the Item", () => {
        let props = item.getSettableProps();
        expect(props).toBeTruthy();
        expect(item).toMatchObject(props);
    });
});

