import Inventory from "./inventory.js";
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
        inventory = new Inventory();
    });

    test("constructor() should create an Inventory", () => {
        expect(inventory).toBeTruthy();
        expect(inventory).toBeInstanceOf(Inventory);
    });

    test("constructor() should throw if size is not a number", () => {
        expect(() => new Inventory("string")).toThrow();
        expect(() => new Inventory(null)).toThrow();
    });

    test("constructor() should initialize with items", () => {
        let inventory = new Inventory(undefined, ["name"]);
        expect(inventory).toBeTruthy();
        expect(inventory).toBeInstanceOf(Inventory);
    });

    test("constructor() should throw if items is not an array", () => {
        expect(() => new Inventory(undefined, "string")).toThrow();
        expect(() => new Inventory(undefined, null)).toThrow();
    });

    test("create() should turn json into an Inventory", () => {
        let json = {
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
        inventory.size = 0;
        expect(inventory.add("name", 0)).toBeTruthy();
    });

    test("add() should allow adding items of size 1+ if it is not full", () => {
        expect(inventory.add("name", 2)).toBeTruthy();
    });

    test("add() should not allow adding items of size 1+ if it is full", () => {
        inventory.size = 0;
        expect(inventory.add("name", 1)).toBeFalsy();
    });

    test("remove() should not allow removing if item is not present", () => {
        expect(inventory.remove("name")).toBeFalsy();
    });

    test("remove() should allow removing if item is present", () => {
        inventory.add("name");
        expect(inventory.remove("name")).toBeTruthy();
        expect(inventory.remove("name")).toBeFalsy();
    });
});