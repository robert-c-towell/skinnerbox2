class ExecutorInterface {
    constructor(adventure) {
        if (!adventure) {
            throw new Error("Parameter adventure required.");
        }
        this.adventure = adventure;
    }

    getAdventure() {}
    getProperty(propId) {}
    
    moveProp(propId, value) {}
    setState(propId, value) {}
    setProperty(propId, value) {}
}

export {ExecutorInterface as default};