import ExecutorInterface from "./executor-interface.js";

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
    contains: "contains",
    exists: "exists",
    variable: "variable"
}

const EvaluationFuncs = {
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
    contains: (a,b) => a.includes(b),
    exists: exists,
    variable: (a,b) => variable(a,b),
}

class Evaluator {
    constructor(Executor) {
        if (!(Executor instanceof ExecutorInterface)) {
            throw new Error(`Parameter Executor must be of type ExecutorInterface`);
        }
        this.Executor = Executor;
    }

    evaluate(expression) {
        if (typeof expression === "string") {
            return expression;
        }
        if (!expression || Array.isArray(expression) || typeof expression !== "object") {
            throw new Error(`Parameter expression must be an object, found ${typeof expression} instead.`);
        }

        let op = Object.keys(expression)[0];
        if (!Object.values(Operators).includes(op)) {
            throw new Error(`Unexpected operator ${op}.`);
        }

        let values = [];

        if (expression[op] && typeof expression[op] === "object" && !Array.isArray(expression[op])) {
            values.push(this.evaluate(expression[op]));
        } else if (Array.isArray(expression[op])) {
            for (let v of expression[op]) {
                if (v && typeof v === "object") {
                    values.push(this.evaluate(v));
                } else {
                    values.push(v);
                }
            }
        } else {
            values = [expression[op]];
        }

        return EvaluationFuncs[op](...values);
    }
};

function exists(a) {
    return a != undefined && a != null && a != false;
}

function variable(a,b) {
    throw new Error("not yet implemented");
}

export { Evaluator as default };