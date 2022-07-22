import ActionExecutorInterface from "./action-executor-interface.js";

class ActionExecutor extends ActionExecutorInterface {
    constructor(adventure) {
        super(adventure);
    }

    getProperty (object) {
        throw new Error("not implemented");
    }

    setProperty (object, value) {
        // call getSettableProps on an object to know what can be modified
        throw new Error("not implemented");
    }
}

export {ActionExecutor as default};