const EventTypes = {
    INPUT: "INPUT"
};

// const EffectTypes = {
//     ADD_ITEM_TO_INVENTORY: "ADD_TO_INVENTORY",
//     REMOVE_ITEM_FROM_INVENTORY: "REMOVE_FROM_INVENTORY",
//     ADD_RULE_TO_INVENTORY: "ADD_RULE_TO_INVENTORY",
//     REMOVE_RULE_FROM_INVENTORY: "REMOVE_RULE_FROM_INVENTORY",
//     SET_VARIABLE: "SET_VARIABLE",

// };

// const ObjectTypes = {
//     ITEM: "ITEM",
//     LOCATION: "LOCATION",
//     PLAYER: "PLAYER",
//     INVENTORY: "INVENTORY",
//     NPC: "NPC",
//     VARIABLE: "VARIABLE"
// };

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

    getSettableProps () {
        return {};
    }
};

export {EventTypes};
export {Event as default};