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
        if (!Array.isArray(conditions)) {
            throw new Error(`Parameter conditions must be an array.`);
        }
        
        let [a, b, c] = conditions;
        if (Array.isArray(a)) {
            a = this.evaluate(a);
        }

        if (Array.isArray(c)) {
            c = this.evaluate(c);
        }

        switch(b) {
            case Operators.AND:
                return a && c;
            case Operators.OR:
                return a || c;
            case Operators.NOT:
                throw new Error(`Operator NOT undefined`);
            case Operators.EQUAL:
                return a == c;
            case Operators.NOT_EQUAL:
                return a != c;
            case Operators.GREATER_THAN:
                return a > c;
            case Operators.GREATER_THAN_OR_EQUAL:
                return a >= c;
            case Operators.LESS_THAN:
                return a < c;
            case Operators.LESS_THAN_OR_EQUAL:
                return a <= c;
            case Operators.EXISTS:
                throw new Error(`Operator EXISTS undefined`);
            case Operators.NOT_EXISTS:
                throw new Error(`Operator EXISTS undefined`);
        }
    }
    
};

export { Operators };
export {EvaluateCondition as default};