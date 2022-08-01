import Room from "./room.js";
import Inventory from "./inventory.js";
import Item from "./item.js";
// TODO: use fake classes to remove some of the boiler plate
import { v4 as uuidv4 } from 'uuid';

describe("Room object", () => {
    let room;
    let inventory;
    let state;

    beforeEach(() => {
        inventory = new Inventory();
        state = {
            id: uuidv4(),
            name: "",
            description: ""
        }
        room = new Room(undefined, "Name", inventory, state.id, [state]);
    });

    test("should create an Room", () => {
        expect(room).toBeTruthy();
        expect(room).toBeInstanceOf(Room);
        expect(room.inventory).toBeInstanceOf(Inventory);
    });

    test("should not be able to initialize a Room with a non-Inventory", () => {
        expect(() => new Room(uuidv4(), "Name", null, state.id, [state])).toThrow();
        expect(() => new Room(uuidv4(), "Name", {}, state.id, [state])).toThrow();
    });

    test("should require name to be a string", () => {
        expect(() => new Room(uuidv4(), {}, inventory, null)).toThrow();
        expect(() => new Room(uuidv4(), null, inventory, null)).toThrow();
    });

    test("should require state to be a string", () => {
        expect(() => new Room(uuidv4(), "Name", inventory, 100)).toThrow();
        expect(() => new Room(uuidv4(), "Name", inventory, null)).toThrow();
    });

    test("should require states to be a list of objects", () => {
        expect(() => new Room(uuidv4(), "Name", inventory, state.id, {})).toThrow();
        expect(() => new Room(uuidv4(), "Name", inventory, state.id, null)).toThrow();
    });

    test("create() should turn json into a Room", () => {
        let json = {
            id: uuidv4(),
            name: "item",
            inventory: inventory,
            state: state.id,
            states: [state],
            events: null
        };
        let item = Room.create(json)
        expect(item).toBeTruthy();
        expect(item).toBeInstanceOf(Room);
    });

    test("getSettableProps should return an object subset of the Room", () => {
        let props = room.getSettableProps();
        expect(props).toBeTruthy();
        expect(room).toMatchObject(props);
    });
});

