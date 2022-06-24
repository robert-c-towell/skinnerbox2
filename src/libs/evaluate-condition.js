/**
 * Does not short circuit
 */

const Operators = {
    AND: "AND",
    OR: "OR",
    NOT: "NOT",
    NOT_EQUAL: "NOT_EQUAL",
    EQUAL: "EQUAL",
    GREATER_THAN: "GREATER_THAN",
    LESS_THAN: "LESS_THAN",
    GREATER_THAN_OR_EQUAL: "GREATER_THAN_OR_EQUAL",
    LESS_THAN_OR_EQUAL: "LESS_THAN_OR_EQUAL",
    EXISTS: "EXISTS",
    NOT_EXISTS: "NOT_EXISTS"
};

class EvaluateCondition {
    constructor() {
        
    }

    evaluate(conditions) {
        if (!conditions || !Array.isArray(conditions)) {
            throw new Error(`Parameter conditions must be an array.`);
        } else if (conditions.length !== 2 && conditions.length !== 3) {
            throw new Error(`Parameter conditions must contain 2-3 elements`);
        }

        let op;
        let values = [];

        for (let c of conditions) {
            if (c && Array.isArray(c)) {
                values.push(this.evaluate(c));
            } else if (Object.values(Operators).includes(c)) {
                op = c;
            } else {
                values.push(c);
            }
        }
        
        return compare(op, ...values);
    }
};

function compare(op, a, b) {
    switch(op) {
        case Operators.AND:
            return a && b;
        case Operators.OR:
            return a || b;
        case Operators.NOT:
            return !a;
        case Operators.EQUAL:
            return a == b;
        case Operators.NOT_EQUAL:
            return a != b;
        case Operators.GREATER_THAN:
            return a > b;
        case Operators.GREATER_THAN_OR_EQUAL:
            return a >= b;
        case Operators.LESS_THAN:
            return a < b;
        case Operators.LESS_THAN_OR_EQUAL:
            return a <= b;
        case Operators.EXISTS:
            return a !== null && a !== undefined;
        case Operators.NOT_EXISTS:
            return a === null || a === undefined;
        default:
            throw new Error(`Undexpected operator ${op}, cannot be evaluated.`);
    }
}

export { Operators };
export {EvaluateCondition as default};