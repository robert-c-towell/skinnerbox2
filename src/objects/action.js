class Action {
    constructor(id, verb, cases) {
        if (!id || typeof id !== "string") {
            throw new Error(`Parameter id must be a string. Received ${id} instead`);
        } else if (!verb || typeof verb !== "string") {
            throw new Error(`Parameter verb must be a string. Received ${verb} instead`);
        } else if (!cases || !Array.isArray(cases)) {
            throw new Error(`Parameter cases must be an array. Received ${cases} instead`);
        }
        this.id = id;
        this.verb = verb;
        this.cases = cases;
    }

    static create(a) {
        return new Action(a.id, a.verb, a.cases);
    }
}

export { Action as default };