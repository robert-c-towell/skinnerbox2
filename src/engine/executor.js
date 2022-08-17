import ExecutorInterface from "./executor-interface.js";

class Executor extends ExecutorInterface {
    constructor(adventure) {
        super(adventure);
    }

    getAdventure() {
        return this.adventure;
    }

    getProperty(propId) {
        console.log("test");
        throw new Error("not implemented");
    }

    moveProp(propId, value) {
        console.log("test");
        throw new Error("not implemented");
    }

    setState(propId, value) {
        console.log("test");
        throw new Error("not implemented");
    }

    setProperty(propId, value) {
        console.log("test");
        throw new Error("not implemented");
    }
}

export {Executor as default};