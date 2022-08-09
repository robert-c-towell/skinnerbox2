import Prop from "./prop.js";
// TODO: use fake classes to remove some of the boiler plate
import { v4 as uuidv4 } from 'uuid';

describe("Prop object", () => {
    let prop;
    let state;

    beforeEach(() => {
        state = {
            id: uuidv4(),
            name: "",
            description: ""
        }
        prop = new Prop(undefined, "Name", null, [], state.id, [state]);
    });

    test("constructor() should create an Prop", () => {
        expect(prop).toBeTruthy();
        expect(prop).toBeInstanceOf(Prop);
    });

    test("constructor() should require name to be a string", () => {
        expect(() => new Prop(uuidv4(), {}, 1, null, null)).toThrow();
        expect(() => new Prop(uuidv4(), null, 1, null, null)).toThrow();
    });

    test("constructor() should require state to be a string", () => {
        expect(() => new Prop(uuidv4(), "Name", 1, null, {})).toThrow();
        expect(() => new Prop(uuidv4(), "Name", 1, null, null)).toThrow();
    });

    test("consturctor() should require states to be a list of objects", () => {
        expect(() => new Prop(uuidv4(), "Name", 1, null, state.id, {})).toThrow();
        expect(() => new Prop(uuidv4(), "Name", 1, null, state.id, null)).toThrow();
    });

    test("create() should turn json into an Prop", () => {
        let json = {
            id: uuidv4(),
            name: "prop",
            parent: "",
            children: [],
            state: state.id,
            states: [state],
        };
        let prop = Prop.create(json)
        expect(prop).toBeTruthy();
        expect(prop).toBeInstanceOf(Prop);
    });

    test("getSettableVariables() should return an object subset of the Prop", () => {
        let props = prop.getSettableVariables();
        expect(props).toBeTruthy();
        expect(prop).toMatchObject(props);
    });
});

