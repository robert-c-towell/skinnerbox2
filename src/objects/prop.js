import { v4 as uuidv4 } from 'uuid';

class Prop {
    constructor(id = uuidv4(), name, parent, children, state, states) {
        if (!name) {
            throw new Error(`Name is a required parameter.`);
        } else if (name && typeof name !== "string") {
            throw new Error(`Name must be a string.`);
        }
        if (!state) {
            throw new Error(`State is a required parameter.`);
        } else if (state && typeof state !== "string") {
            throw new Error(`State must be a string.`);
        }
        if (!states) {
            throw new Error(`States is a required parameter.`);
        } else if (states && !Array.isArray(states)) {
            throw new Error(`States must be a string.`);
        }
        this.id = id;
        this.name = name;
        this.parent = parent;
        this.children = children;
        this.state = state;
        this.states = states;
    }

    static create(i) {
        return new Prop(i.id, i.name, i.parent, i.children, i.state, i.states);
    }

    getSettableVariables () {
        let props = structuredClone(this);
        delete props.id;
        return props;
    }
}

export {Prop as default};