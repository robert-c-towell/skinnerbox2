import Scene from "./scene.js";
import Prop from "./prop.js";
// TODO: use fake classes to remove some of the boiler plate
import { v4 as uuidv4 } from 'uuid';

describe("Scene object", () => {
    let scene;
    let state;

    beforeEach(() => {
        state = {
            id: uuidv4(),
            name: "",
            description: ""
        }
        scene = new Scene(undefined, "Name", state.id, [state]);
    });

    test("should create an Scene", () => {
        expect(scene).toBeTruthy();
        expect(scene).toBeInstanceOf(Scene);
    });

    test("should require name to be a string", () => {
        expect(() => new Scene(uuidv4(), {}, null)).toThrow();
        expect(() => new Scene(uuidv4(), null, null)).toThrow();
    });

    test("should require state to be a string", () => {
        expect(() => new Scene(uuidv4(), "Name", 100)).toThrow();
        expect(() => new Scene(uuidv4(), "Name", null)).toThrow();
    });

    test("should require states to be a list of objects", () => {
        expect(() => new Scene(uuidv4(), "Name", state.id, {})).toThrow();
        expect(() => new Scene(uuidv4(), "Name", state.id, null)).toThrow();
    });

    test("create() should turn json into a Scene", () => {
        let json = {
            id: uuidv4(),
            name: "prop",
            state: state.id,
            states: [state],
            exits: [],
            events: [],
        };
        let prop = Scene.create(json)
        expect(prop).toBeTruthy();
        expect(prop).toBeInstanceOf(Scene);
    });

    test("getSettableVariables should return an object subset of the Scene", () => {
        let props = scene.getSettableVariables();
        expect(props).toBeTruthy();
        expect(scene).toMatchObject(props);
    });
});