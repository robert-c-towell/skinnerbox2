import Action from "./action.js";
// TODO: use fake classes to remove some of the boiler plate

describe("Action object", () => {
    let action;
    let id = "12";

    beforeEach(() => {
        action = new Action(id, "go", [1,2]);
    });

    test("should create an Action", () => {
        expect(action).toBeTruthy();
        expect(action).toBeInstanceOf(Action);
    });

    test("should require a valid id", () => {
        expect(() => new Action()).toThrow();
        expect(() => new Action(null)).toThrow();
    });

    test("should require a verb", () => {
        expect(() => new Action(id)).toThrow();
        expect(() => new Action(id, null)).toThrow();
    });

    test("should require an array of cases", () => {
        expect(() => new Action(id, "go")).toThrow();
        expect(() => new Action(id, "go", null)).toThrow();
    });

    test("create() should create an Action", () => {
        action = Action.create({
            id: id,
            verb: "go",
            cases: [1,2]
        });
        expect(action).toBeTruthy();
        expect(action).toBeInstanceOf(Action);
    });
});