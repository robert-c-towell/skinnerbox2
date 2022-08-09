import StateExecutorInterface from "./state-executor-interface.js";
import StateExecutor from "./state-executor-interface.js";

import adventure from "../../design/example_adventure.json";

describe("StateExecutor", () => {
    let stateExecutor;

    beforeAll(() => {
        stateExecutor = new StateExecutor(adventure);
    });

    test("constructor() should create an StateExecutor", () => {
        expect(stateExecutor).toBeTruthy();
        expect(stateExecutor).toBeInstanceOf(StateExecutor);
        expect(stateExecutor).toBeInstanceOf(StateExecutorInterface);
        expect(() => new StateExecutor()).toThrow();
    });

    test("getProperty() should get property of an object", () => {
        expect(stateExecutor.getProperty()).toThrow();
        expect(() => stateExecutor.getProperty()).toThrow();
    });

    test("setProperty() should set property on an object", () => {
        expect(() => stateExecutor.setProperty()).toThrow();
    });
});