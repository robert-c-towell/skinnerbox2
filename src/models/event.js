const EventTypes = {
    COMMAND: "COMMAND",
    OTHER_USER_INTERACTS: "OTHER_USER_INTERACTS"
};

class Event {
    constructor(type, conditions, effects) {
        if (!Object.values(EventTypes).includes(type)) {
            throw Error(`Unexpected event type: ${type}.`)
        }
        if (!conditions) {
            throw Error(`Conditions required to create event.`)
        }
        if (!effects) {
            throw Error(`Effects required to create event.`)
        }
        this.type = type;
        this.conditions = conditions;
        this.effects = effects;
    }
};

export {EventTypes};
export {Event as default};