const EventTypes = {
    INPUT: "INPUT",
    GENERAL: "GENERAL"
};

class Event {
    constructor(type, message, broadcastMessage = null, conditions = null, effects = null) {
        if (!Object.values(EventTypes).includes(type)) {
            throw new Error(`Unexpected event type: ${type}.`);
        }
        if (!message) {
            throw new Error(`Parameter message is required.`);
        } else if (message && !(typeof message === "string")) {
            throw new Error(`Parameter message must be a string.`);
        }
        if (broadcastMessage && !(typeof broadcastMessage === "string")) {
            throw new Error(`Parameter broadcastMessage must be a string.`);
        }
        if (conditions && !Array.isArray(conditions)) {
            throw new Error(`Parameter conditions must be an array.`);
        }
        if (effects && !Array.isArray(effects)) {
            throw new Error(`Parameter effects must be an array.`);
        }
        this.type = type;
        this.message = message;
        this.broadcastMessage = broadcastMessage;
        this.conditions = conditions;
        this.effects = effects;
    }

    static create(e) {
        return new Event(e.type, e.message, e.broadcastMessage, e.conditions, e.effects);
    }

    getSettableProps () {
        return {};
    }
};

export {EventTypes};
export {Event as default};