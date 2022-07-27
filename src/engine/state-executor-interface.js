class StateExecutorInterface {
    constructor(adventure) {
        if (!adventure) {
            throw new Error("Property adventure required.");
        }
        this.adventure = adventure;
    }

    getProperty () {}
    setProperty () {}
}

export {StateExecutorInterface as default};