import Action from "./action.js";
// TODO: use fake classes to remove some of the boiler plate

describe("Action object", () => {
    let action;
    let id = "12";

    beforeEach(() => {
        action = new Action(id);
    });

    test("should create an Action", () => {
        expect(action).toBeTruthy();
        expect(action).toBeInstanceOf(Action);
    });

    test("should require a valid id", () => {
        expect(() => new Action()).toThrow();
        expect(() => new Action(null)).toThrow();
    });

    test("create() should create an Action", () => {
        action = Action.create({
            id: id
        });
        expect(action).toBeTruthy();
        expect(action).toBeInstanceOf(Action);
    });
});