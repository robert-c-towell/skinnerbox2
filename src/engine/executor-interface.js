class ExecutorInterface {
    constructor(adventure) {
        if (!adventure) {
            throw new Error("Parameter adventure required.");
        }
        this.adventure = adventure;
    }

    getProperty () {}
    setProperty () {}
}

export {ExecutorInterface as default};