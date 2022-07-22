class ActionExecutorInterface {
    constructor(adventure) {
        if (!adventure) {
            throw new Error("Property adventure required.");
        }
        this.adventure = adventure;
    }

    getProperty (object) {}
    setProperty (object, value) {}
}

export {ActionExecutorInterface as default};