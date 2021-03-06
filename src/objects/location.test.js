import Location from "./location.js";
import Inventory from "./inventory.js";
import Item from "./item.js";
// TODO: use fake classes to remove some of the boiler plate
import { v4 as uuidv4 } from 'uuid';

describe("Location object", () => {
    let location;
    let inventory;
    let state;

    beforeEach(() => {
        inventory = new Inventory();
        state = {
            id: uuidv4(),
            name: "",
            description: ""
        }
        location = new Location(undefined, "Name", inventory, state.id, [state]);
    });

    test("should create an Location", () => {
        expect(location).toBeTruthy();
        expect(location).toBeInstanceOf(Location);
        expect(location.inventory).toBeInstanceOf(Inventory);
    });

    test("should not be able to initialize a Location with a non-Inventory", () => {
        expect(() => new Location(uuidv4(), "Name", null, state.id, [state])).toThrow();
        expect(() => new Location(uuidv4(), "Name", {}, state.id, [state])).toThrow();
    });

    test("should require name to be a string", () => {
        expect(() => new Location(uuidv4(), {}, inventory, null)).toThrow();
        expect(() => new Location(uuidv4(), null, inventory, null)).toThrow();
    });

    test("should require state to be a string", () => {
        expect(() => new Location(uuidv4(), "Name", inventory, 100)).toThrow();
        expect(() => new Location(uuidv4(), "Name", inventory, null)).toThrow();
    });

    test("should require states to be a list of objects", () => {
        expect(() => new Location(uuidv4(), "Name", inventory, state.id, {})).toThrow();
        expect(() => new Location(uuidv4(), "Name", inventory, state.id, null)).toThrow();
    });

    test("create() should turn json into a Location", () => {
        let json = {
            id: uuidv4(),
            name: "item",
            inventory: inventory,
            state: state.id,
            states: [state],
            events: null
        };
        let item = Location.create(json)
        expect(item).toBeTruthy();
        expect(item).toBeInstanceOf(Location);
    });

    test("getSettableProps should return an object subset of the Location", () => {
        let props = location.getSettableProps();
        expect(props).toBeTruthy();
        expect(location).toMatchObject(props);
    });
});

