export const Operators = {
    "||": "||",
    "&&": "&&",
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
    "^": "^",
    log: "log",
    concat: "concat",
    message: "message",
    broadcast: "broadcast",
    contains: "contains",
    exists: "exists",
    variable: "variable",
    command: "command",
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
    log: (a) => Math.round(Math.log(a) * 100) / 100,
    concat: (...args) => args.join(""),
    message: (a) => {},
    broadcast: (a) => {},
    contains: (a,b) => {},
    exists: exists,
    variable: (a,b) => {},
    command: (a) => {},
}

class Parser {
    constructor() {

    }

    parse(expression) {
        if (!expression || !Array.isArray(expression)) {
            throw new Error(`Parameter expression must be an array.`);
        } if (expression.length < 2) {
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

function exists(a) {
    return a != undefined && a != null && a != false;
}

export { Parser as default };