import Inventory from "./inventory.js";
import Item from "./item.js";
// TODO: use fake classes
import { v4 as uuidv4 } from 'uuid';

describe("Inventory object", () => {
    let inventory;

    beforeEach(() => {
        inventory = new Inventory(Item);
    });

    test("constructor should create an Inventory", () => {
        expect(inventory).toBeTruthy();
        expect(inventory).toBeInstanceOf(Inventory);
    });

    test("getSettableProps should return a subset of the Inventory", () => {
        let props = inventory.getSettableProps();
        expect(props).toBeTruthy();
        expect(inventory).toMatchObject(props);
    });

    test("should not hold non-items", () => {
        let notAnItem = {};
        expect(() => inventory.add(notAnItem)).toThrow();
    });

    test("should allow adding items of size 0 when full", () => {
        let item = new Item(uuidv4(), 0);
        inventory.size = 0;
        expect(inventory.add(item)).toBeTruthy();
    });

    test("should allow adding items of size 1+ if it is not full", () => {
        let item = new Item();
        expect(inventory.add(item)).toBeTruthy();
    });

    test("should not allow adding items of size 1+ if it is full", () => {
        let item = new Item();
        inventory.size = 0;
        expect(inventory.add(item)).toBeFalsy();
    });

    test("should not allow removing if item is not present", () => {
        let item = new Item();
        expect(inventory.remove(item.id)).toBeFalsy();
    });

    test("should allow removing if item is present", () => {
        let item = new Item(uuidv4(), 1);
        inventory.add(item);
        expect(inventory.remove(item.id)).toBeTruthy();
        expect(inventory.remove(item.id)).toBeFalsy();
    });
});