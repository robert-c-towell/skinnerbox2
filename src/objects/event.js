const EventTypes = {
    INPUT: "INPUT",
    GENERAL: "GENERAL"
};

class Event {
    constructor(id, type, conditions, effects) {
        if (!id) {
            throw new Error(`Parameter id is required.`);
        }
        if (!Object.values(EventTypes).includes(type)) {
            throw new Error(`Unexpected event type: ${type}.`);
        }
        if (!conditions) {
            throw new Error(`Parameter conditions is required.`);
        } else if (conditions && !Array.isArray(conditions)) {
            throw new Error(`Parameter conditions must be an array.`);
        }
        if (!effects) {
            throw new Error(`Parameter effects is required.`);
        } else if (effects && !Array.isArray(effects)) {
            throw new Error(`Parameter effects must be an array.`);
        }
        this.id = id;
        this.type = type;
        this.conditions = conditions;
        this.effects = effects;
    }

    static create(e) {
        return new Event(e.id, e.type, e.conditions, e.effects);
    }

    getSettableProps () {
        return {};
    }
};

export {EventTypes};
export {Event as default};