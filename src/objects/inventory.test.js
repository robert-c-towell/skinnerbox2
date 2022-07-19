import Inventory from "./inventory.js";
import Item from "./item.js";
// TODO: use fake classes to remove some of the boiler plate
import { v4 as uuidv4 } from 'uuid';

describe("Inventory object", () => {
    let inventory;

    let state = {
        id: uuidv4(),
        name: "",
        description: ""
    }

    beforeEach(() => {
        inventory = new Inventory(Item);
    });

    test("constructor() should create an Inventory", () => {
        expect(inventory).toBeTruthy();
        expect(inventory).toBeInstanceOf(Inventory);
    });

    test("constructor() should throw if not supplied with Item class", () => {
        expect(() => new Inventory()).toThrow();
    });

    test("constructor() should throw if size is not a number", () => {
        expect(() => new Inventory(Item, "string")).toThrow();
        expect(() => new Inventory(Item, null)).toThrow();
    });

    test("constructor() should initialize with items", () => {
        let items = [new Item(undefined, "Name", undefined, undefined, state.id, [state])];
        let inventory = new Inventory(Item, undefined, items);
        expect(inventory).toBeTruthy();
        expect(inventory).toBeInstanceOf(Inventory);
    });

    test("constructor() should throw if items is not an array", () => {
        expect(() => new Inventory(Item, undefined, "string")).toThrow();
        let item = new Item(undefined, "Name", undefined, undefined, state.id, [state]);
        expect(() => new Inventory(Item, undefined, item)).toThrow();
    });

    test("constructor() should throw if items contain a non-item", () => {
        let item = new Item(undefined, "Name", undefined, undefined, state.id, [state]);
        let items = [item, item.getSettableProps()];
        expect(() => new Inventory(Item, undefined, items)).toThrow();
    });

    test("create() should turn json into an Inventory", () => {
        let json = {
            Item: Item,
            id: uuidv4(),
            size: 10,
            items: []
        };
        let inventory = Inventory.create(json)
        expect(inventory).toBeTruthy();
        expect(inventory).toBeInstanceOf(Inventory);
    });

    test("getSettableProps() should return a subset of the Inventory", () => {
        let props = inventory.getSettableProps();
        expect(props).toBeTruthy();
        expect(inventory).toMatchObject(props);
    });

    test("add() should not hold non-items", () => {
        let notAnItem = {};
        expect(() => inventory.add(notAnItem)).toThrow();
    });

    test("add() should allow adding items of size 0 when full", () => {
        let item = new Item(undefined, "Name", 0, undefined, state.id, [state]);
        inventory.size = 0;
        expect(inventory.add(item)).toBeTruthy();
    });

    test("add() should allow adding items of size 1+ if it is not full", () => {
        let item = new Item(undefined, "Name", undefined, undefined, state.id, [state]);
        expect(inventory.add(item)).toBeTruthy();
    });

    test("add() should not allow adding items of size 1+ if it is full", () => {
        let item = new Item(undefined, "Name", undefined, undefined, state.id, [state]);
        inventory.size = 0;
        expect(inventory.add(item)).toBeFalsy();
    });

    test("remove() should not allow removing if item is not present", () => {
        let item = new Item(undefined, "Name", undefined, undefined, state.id, [state]);
        expect(inventory.remove(item.id)).toBeFalsy();
    });

    test("remove() should allow removing if item is present", () => {
        let item = new Item(undefined, "Name", undefined, undefined, state.id, [state] );
        inventory.add(item);
        expect(inventory.remove(item.id)).toBeTruthy();
        expect(inventory.remove(item.id)).toBeFalsy();
    });
});