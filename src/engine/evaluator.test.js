import ExecutorInterface from "./executor-interface.js";
import Evaluator, { Operators as Op } from "./evaluator.js";

import adventure from "../../design/example_adventure.json";

describe("Evaluator", () => {
    let evaluator;

    beforeAll(() => {
        let executorInterface = new ExecutorInterface(adventure);
        evaluator = new Evaluator(executorInterface);
    })

    test("constructor() should create an Evaluator", () => {
        expect(evaluator).toBeTruthy();
        expect(evaluator).toBeInstanceOf(Evaluator);
        expect(() => new Evaluator()).toThrow();
    });

    test("evaluate() should require an object with one key from the op list, or a string", () => {
        expect(() => evaluator.evaluate()).toThrow();
        expect(() => evaluator.evaluate([Op["!"]])).toThrow();
        expect(() => evaluator.evaluate([Op["!"], false])).toThrow();
        expect(() => evaluator.evaluate({ a: 1 })).toThrow();
        expect(() => evaluator.evaluate("string")).toBeTruthy();
    });

    test("evaluate() should handle comparison operators", () => {
        // Truthy
        expect(evaluator.evaluate({[Op["=="]]: [1,1]})).toBeTruthy();
        expect(evaluator.evaluate({[Op["=="]]: ["a","a"]})).toBeTruthy();
        expect(evaluator.evaluate({[Op["<"]]: [1, 10]})).toBeTruthy();
        expect(evaluator.evaluate({[Op[">"]]: [5,1]})).toBeTruthy();
        expect(evaluator.evaluate({[Op["<="]]: [1,1]})).toBeTruthy();
        expect(evaluator.evaluate({[Op[">="]]: [1,1]})).toBeTruthy();
        expect(evaluator.evaluate({[Op["!="]]: ["start","end"]})).toBeTruthy();
        expect(evaluator.evaluate({[Op["=="]]: [{[Op.variable]: ["message.noun.state"]},"closed"]})).toBeTruthy();

        // Falsey
        expect(evaluator.evaluate({[Op["=="]]: [1,2]})).toBeFalsy();
        expect(evaluator.evaluate({[Op["=="]]: ["a","b"]})).toBeFalsy();
        expect(evaluator.evaluate({[Op["<"]]: [10,1]})).toBeFalsy();
        expect(evaluator.evaluate({[Op[">"]]: [1,5]})).toBeFalsy();
        expect(evaluator.evaluate({[Op["<="]]: [2,1]})).toBeFalsy();
        expect(evaluator.evaluate({[Op[">="]]: [0,1]})).toBeFalsy();
        expect(evaluator.evaluate({[Op["!="]]: ["start","start"]})).toBeFalsy();
    });

    test("evaluate() should handle math operators", () => {
        // Truthy
        expect(evaluator.evaluate({[Op["+"]]: [1,1]})).toEqual(2);
        expect(evaluator.evaluate({[Op["-"]]: ["1","1"]})).toEqual(0);
        expect(evaluator.evaluate({[Op["/"]]: [6,3]})).toEqual(2);
        expect(evaluator.evaluate({[Op["*"]]: [5,1]})).toEqual(5);
        expect(evaluator.evaluate({[Op["%"]]: [10,12]})).toEqual(10);
        expect(evaluator.evaluate({[Op["^"]]: [10,2]})).toEqual(100);
        expect(evaluator.evaluate({[Op.log]: [100]})).toEqual(4.61);
    });

    test("evaluate() exists", () => {
        // Truthy
        expect(evaluator.evaluate({[Op.exists]: ["name"]})).toBeTruthy();
        expect(evaluator.evaluate({[Op["!"]]: {[Op.exists]: null}})).toBeTruthy();
        // Falsey
        expect(evaluator.evaluate({[Op.exists]: [null]})).toBeFalsy();
        expect(evaluator.evaluate({[Op["!"]]: {[Op.exists]: ["name"]}})).toBeFalsy();
    });

    test("evaluate() boolean logic operators", () => {
        // Truthy
        expect(evaluator.evaluate({[Op["||"]]: [false, true]})).toBeTruthy();
        expect(evaluator.evaluate({
            [Op["||"]]: [
                {[Op["=="]]: [1,1]},
                {[Op["=="]]: [1,2]}]
            })).toBeTruthy();
        // Falsey
        expect(evaluator.evaluate({[Op["&&"]]: [
            {[Op["=="]]: [1,1]},
            {[Op["=="]]: [1,2]}]
        })).toBeFalsy();
    });

    test("evaluate() concat", () => {
        expect(evaluator.evaluate({[Op.concat]: ["This is"," a test"]})).toEqual("This is a test");
        expect(evaluator.evaluate({[Op.concat]: ["This ","is ","a ","test"]})).toEqual("This is a test");
        expect(evaluator.evaluate({[Op.concat]: ["You have ",{[Op["+"]]: [2,1]}," ammo."]})).toEqual("You have 3 ammo.");
    });

    test("evaluate() funcs", () => {
        expect(evaluator.evaluate({[Op.contains]: ["This is a test", "This"]})).toBeTruthy();
        expect(evaluator.evaluate({[Op.variable]: ["This is a test"]})).toBeTruthy();
    });
});