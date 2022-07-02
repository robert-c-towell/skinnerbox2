/**
 * Does not short circuit
 */

const Operators = {
    "==": "==",
    "!=": "!=",
    ">": ">",
    ">=": ">=",
    "<": "<",
    "<=": "<=",
    "!": "!",
    "=": "=",
    "+": "+",
    "+=": "+=",
    "-": "-",
    "-=": "-=",
    "/": "/",
    "/=": "/=",
    "*": "*",
    "*=": "*=",
    "%": "%",
    "%=": "%=",
    "||": "||",
    "&&": "&&",
    concat: "concat",
    message: "message",
    broadcast: "broadcast",
    contains: "contains",
    exists: "exists",
    variable: "variable",
}

const Functions = {
    "||": (...args) => args.reduce((a,b) => {return a || b}),
    "&&": (...args) => args.reduce((a,b) => {return a && b}),
    "==": (a,b) => a == b,
    "!=": (a,b) => a != b,
    ">": (a,b) => a > b,
    ">=": (a,b) => a >= b,
    "<": (a,b) => a < b,
    "<=": (a,b) => a <= b,
    "!": (a) => !a,
    "=": (a,b) => {},
    "+": (a,b) => a + b,
    "+=": (a,b) => {},
    "-": (a,b) => a - b,
    "-=": (a,b) => {},
    "/": (a,b) => a / b,
    "/=": (a,b) => {},
    "*": (a,b) => a * b,
    "*=": (a,b) => {},
    "%": (a,b) => a % b,
    "%=": (a,b) => {},
    "^": (a,b) => Math.pow(a,b),
    log: (a,b) => Math.log(a),
    concat: concat,
    message: (a) => {},
    broadcast: (a) => {},
    contains: (a,b) => {},
    exists: (a) => exists,
    variable: (a,b) => {},
    command: (a) => {},
}

let parser;

class Parser {
    constructor() {

    }

    static create(...args) {
        if (!parser) {
            parser = new Parser(...args);
        }
        return parser;
    }

    parse(expression) {
        if (!expression || !Array.isArray(expression)) {
            throw new Error(`Parameter expression must be an array.`);
        } else if (expression.length < 2) {
            throw new Error(`Parameter expression must contain at least 2 elements`);
        }

        let op;
        let values = [];

        for (let c of expression) {
            if (c && Array.isArray(c)) {
                values.push(this.parse(c));
            } else if (Object.values(Operators).includes(c)) {
                op = c;
            } else {
                values.push(c);
            }
        }
        
        return Functions[op](...values);
    }
};

function concat(...args) {
    let s = "";
    for (let arg of args) {
        if (Array.isArray(arg)) {
            s += parser.parse(arg);
        } else {
            s += arg;
        }
    }

    return s;
}

function exists(a) {
    return a == true;
}

export { Operators };
export {Parser as default};