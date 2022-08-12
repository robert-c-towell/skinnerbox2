import ExecutorInterface from "./executor-interface.js";

class Executor extends ExecutorInterface {
    constructor(adventure) {
        super(adventure);
    }

    getProperty (object) {
        console.log("test");
        throw new Error("not implemented");
    }

    setProperty (object, value) {
        console.log("test");
        // call getSettableVariables on an object to know what can be modified
        throw new Error("not implemented");
    }
}

export {Executor as default};