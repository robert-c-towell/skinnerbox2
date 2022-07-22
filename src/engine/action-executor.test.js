import ActionExecutorInterface from "./action-executor-interface.js";
import ActionExecutor from "./action-executor-interface.js";

describe("ActionExecutor", () => {
    let actionExecutor;

    beforeAll(() => {
        actionExecutor = new ActionExecutor();
    })

    test("constructor() should create an ActionExecutor", () => {
        expect(actionExecutor).toBeTruthy();
        expect(actionExecutor).toBeInstanceOf(ActionExecutor);
        expect(actionExecutor).toBeInstanceOf(ActionExecutorInterface);
        expect(() => new ActionExecutor()).toThrow();
    });

    test("getProperty() should get property of an object", () => {
        expect(actionExecutor.getProperty()).toThrow();
    });

    test("setProperty() should set property on an object", () => {
        expect(actionExecutor.setProperty()).toThrow();
    });
});