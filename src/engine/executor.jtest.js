import ExecutorInterface from "./state-executor-interface.js";
import Executor from "./state-executor-interface.js";

import adventure from "../../design/example_adventure.json";

describe("Executor", () => {
    let executor;

    beforeAll(() => {
        executor = new Executor(adventure);
    });

    test("constructor() should create an Executor", () => {
        expect(executor).toBeTruthy();
        expect(executor).toBeInstanceOf(Executor);
        expect(executor).toBeInstanceOf(ExecutorInterface);
        expect(() => new Executor()).toThrow();
    });

    test("getProperty() should get property of an object", () => {
        expect(executor.getProperty()).toThrow();
        expect(() => executor.getProperty()).toThrow();
    });

    test("setProperty() should set property on an object", () => {
        expect(() => executor.setProperty()).toThrow();
    });
});