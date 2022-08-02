class Action {
    constructor(id) {
        if (!id || typeof id !== "string") {
            throw new Error(`Parameter id must be a string. Received ${id} instead`);
        }
    }

    static create(a) {
        return new Action(a.id);
    }
}

export { Action as default };