import StateExecutorInterface from "./state-executor-interface.js";

class StateExecutor extends StateExecutorInterface {
    constructor(adventure) {
        super(adventure);
    }

    getProperty (object) {
        console.log("test");
        throw new Error("not implemented");
    }

    setProperty (object, value) {
        console.log("test");
        // call getSettableProps on an object to know what can be modified
        throw new Error("not implemented");
    }
}

export {StateExecutor as default};