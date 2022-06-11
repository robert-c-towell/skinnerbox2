class GameObject {
    constructor(type, state = null, states = null) {
        this.type = type;
        this.state = state;
        this.states = states;
    }

    toString () {
        let data = {
            type: this.type,
            state: this.state,
            states: this.states
        };

        return JSON.stringify(data);
    }
};

export {GameObject as default};