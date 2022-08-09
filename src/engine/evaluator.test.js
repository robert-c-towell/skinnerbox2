import StateExecutorInterface from "./state-executor-interface.js";
import Evaluator, { Operators as Op } from "./evaluator.js";

import adventure from "../../design/example_adventure.json";

describe("Evaluator", () => {
    let evaluator;

    beforeAll(() => {
        let stateExecutorInterface = new StateExecutorInterface(adventure);
        evaluator = new Evaluator(stateExecutorInterface);
    })

    test("constructor() should create a Evaluator", () => {
        expect(evaluator).toBeTruthy();
        expect(evaluator).toBeInstanceOf(Evaluator);
        expect(() => new Evaluator()).toThrow();
    });

    test("parse() should require conditions and it should be an array", () => {
        expect(() => evaluator.parse()).toThrow();
        expect(() => evaluator.parse("string")).toThrow();
        expect(() => evaluator.parse({ a: 1 })).toThrow();
        expect(() => evaluator.parse([Op["!"]])).toThrow();
        expect(() => evaluator.parse([Op["!"], false], {})).toThrow();
        expect(() => evaluator.parse([Op["!"], false], 10)).toThrow();
    });

    test("parse() should handle comparison operators", () => {
        // Truthy
        expect(evaluator.parse([1,Op["=="],1])).toBeTruthy();
        expect(evaluator.parse(["a",Op["=="],"a"])).toBeTruthy();
        expect(evaluator.parse([1,Op["<"],10])).toBeTruthy();
        expect(evaluator.parse([5,Op[">"],1])).toBeTruthy();
        expect(evaluator.parse([1,Op["<="],1])).toBeTruthy();
        expect(evaluator.parse([1,Op[">="],1])).toBeTruthy();
        expect(evaluator.parse(["start",Op["!="],"end"])).toBeTruthy();

        // Falsey
        expect(evaluator.parse([1,Op["=="],2])).toBeFalsy();
        expect(evaluator.parse(["a",Op["=="],"b"])).toBeFalsy();
        expect(evaluator.parse([10,Op["<"],1])).toBeFalsy();
        expect(evaluator.parse([1,Op[">"],5])).toBeFalsy();
        expect(evaluator.parse([2,Op["<="],1])).toBeFalsy();
        expect(evaluator.parse([0,Op[">="],1])).toBeFalsy();
        expect(evaluator.parse(["start",Op["!="],"start"])).toBeFalsy();
    });

    test("parse() should handle math operators", () => {
        // Truthy
        expect(evaluator.parse([1,Op["+"],1])).toEqual(2);
        expect(evaluator.parse(["1",Op["-"],"1"])).toEqual(0);
        expect(evaluator.parse([6,Op["/"],3])).toEqual(2);
        expect(evaluator.parse([5,Op["*"],1])).toEqual(5);
        expect(evaluator.parse([10,Op["%"],12])).toEqual(10);
        expect(evaluator.parse([10,Op["^"],2])).toEqual(100);
        expect(evaluator.parse([100,Op.log,])).toEqual(4.61);
    });

    test("parse() exists", () => {
        // Truthy
        expect(evaluator.parse(["name",Op.exists])).toBeTruthy();
        expect(evaluator.parse([Op["!"],[Op.exists, null]])).toBeTruthy();
        // Falsey
        expect(evaluator.parse([null,Op.exists])).toBeFalsy();
        expect(evaluator.parse([Op["!"],["name",Op.exists]])).toBeFalsy();
    });

    test("parse() boolean logic operators", () => {
        // Truthy
        expect(evaluator.parse([Op["||"],false, true])).toBeTruthy();
        expect(evaluator.parse([[1,Op["=="],1],Op["||"],[1,Op["=="],2]])).toBeTruthy();
        // Falsey
        expect(evaluator.parse([[1,Op["=="],1],Op["&&"],[1,Op["=="],2]])).toBeFalsy();
    });

    test("parse() concat", () => {
        expect(evaluator.parse(["concat","This is"," a test"])).toEqual("This is a test");
        expect(evaluator.parse(["concat","This ","is ","a ","test"])).toEqual("This is a test");
        expect(evaluator.parse(["concat","You have ",[Op["+"],2,1]," ammo."])).toEqual("You have 3 ammo.");
    });

    test("parse() funcs", () => {
        expect(evaluator.parse(["message","This is a test"])).toEqual({message: "This is a test"});
        expect(evaluator.parse(["broadcast","This is a test"])).toEqual({broadcast: "This is a test"});
        expect(evaluator.parse(["contains","This is a test", "This"])).toBeTruthy();
        expect(evaluator.parse(["variable","This is a test"])).toBeTruthy();
        expect(evaluator.parse(["command","go north"], "go north")).toBeTruthy();
    });
});