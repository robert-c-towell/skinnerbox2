import StateExecutorInterface from "./state-executor-interface.js";

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
    "=": setValue,
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
    message: (a) => ({ message: a }),
    broadcast: (a) => ({ broadcast: a }),
    contains: (a,b) => a.includes(b),
    exists: exists,
    variable: (a,b) => {throw new Error("not implemented")},
    command: (a, input) => {throw new Error("not implemented")},
}

class Evaluator {
    constructor(StateExecutor) {
        if (!(StateExecutor instanceof StateExecutorInterface)) {
            throw new Error(`Parameter StateExecutor must be of type StateExecutorInterface`);
        }
        this.StateExecutor = StateExecutor;
    }

    parse(expression, input) {
        if (!expression || !Array.isArray(expression)) {
            throw new Error(`Parameter expression must be an array.`);
        } else if (expression.length < 2) {
            throw new Error(`Parameter expression must contain at least 2 elements`);
        } else if (input && typeof input != "string") {
            throw new Error(`Parameter input must be a string.`);
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

        if (op === "command") {
            return Functions[op](...values, input);
        } else {
            return Functions[op](...values);
        }
    }
};

function setValue(a,b) {
    this.StateExecutor.setProperty(a,b);
}

function exists(a) {
    return a != undefined && a != null && a != false;
}

export { Evaluator as default };