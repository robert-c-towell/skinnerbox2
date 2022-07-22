import ActionExecutorInterface from "./action-executor-interface.js";
import Parser, { Operators as Op } from "./parser.js";

describe("Parser", () => {
    let parser;

    beforeAll(() => {
        let actionExecutorInterface = new ActionExecutorInterface();
        parser = new Parser(actionExecutorInterface);
    })

    test("constructor() should create a Parser", () => {
        expect(parser).toBeTruthy();
        expect(parser).toBeInstanceOf(Parser);
        expect(() => new Parser()).toThrow();
    });

    test("parse() should require conditions and it should be an array", () => {
        expect(() => parser.parse()).toThrow();
        expect(() => parser.parse("string")).toThrow();
        expect(() => parser.parse({ a: 1 })).toThrow();
        expect(() => parser.parse([Op["!"]])).toThrow();
        expect(() => parser.parse([Op["!"], false], {})).toThrow();
        expect(() => parser.parse([Op["!"], false], 10)).toThrow();
    });

    test("parse() should handle comparison operators", () => {
        // Truthy
        expect(parser.parse([1,Op["=="],1])).toBeTruthy();
        expect(parser.parse(["a",Op["=="],"a"])).toBeTruthy();
        expect(parser.parse([1,Op["<"],10])).toBeTruthy();
        expect(parser.parse([5,Op[">"],1])).toBeTruthy();
        expect(parser.parse([1,Op["<="],1])).toBeTruthy();
        expect(parser.parse([1,Op[">="],1])).toBeTruthy();
        expect(parser.parse(["start",Op["!="],"end"])).toBeTruthy();

        // Falsey
        expect(parser.parse([1,Op["=="],2])).toBeFalsy();
        expect(parser.parse(["a",Op["=="],"b"])).toBeFalsy();
        expect(parser.parse([10,Op["<"],1])).toBeFalsy();
        expect(parser.parse([1,Op[">"],5])).toBeFalsy();
        expect(parser.parse([2,Op["<="],1])).toBeFalsy();
        expect(parser.parse([0,Op[">="],1])).toBeFalsy();
        expect(parser.parse(["start",Op["!="],"start"])).toBeFalsy();
    });

    test("parse() should handle math operators", () => {
        // Truthy
        expect(parser.parse([1,Op["+"],1])).toEqual(2);
        expect(parser.parse(["1",Op["-"],"1"])).toEqual(0);
        expect(parser.parse([6,Op["/"],3])).toEqual(2);
        expect(parser.parse([5,Op["*"],1])).toEqual(5);
        expect(parser.parse([10,Op["%"],12])).toEqual(10);
        expect(parser.parse([10,Op["^"],2])).toEqual(100);
        expect(parser.parse([100,Op.log,])).toEqual(4.61);
    });

    test("parse() exists", () => {
        // Truthy
        expect(parser.parse(["name",Op.exists])).toBeTruthy();
        expect(parser.parse([Op["!"],[Op.exists, null]])).toBeTruthy();
        // Falsey
        expect(parser.parse([null,Op.exists])).toBeFalsy();
        expect(parser.parse([Op["!"],["name",Op.exists]])).toBeFalsy();
    });

    test("parse() boolean logic operators", () => {
        // Truthy
        expect(parser.parse([Op["||"],false, true])).toBeTruthy();
        expect(parser.parse([[1,Op["=="],1],Op["||"],[1,Op["=="],2]])).toBeTruthy();
        // Falsey
        expect(parser.parse([[1,Op["=="],1],Op["&&"],[1,Op["=="],2]])).toBeFalsy();
    });

    test("parse() concat", () => {
        expect(parser.parse(["concat","This is"," a test"])).toEqual("This is a test");
        expect(parser.parse(["concat","This ","is ","a ","test"])).toEqual("This is a test");
        expect(parser.parse(["concat","You have ",[Op["+"],2,1]," ammo."])).toEqual("You have 3 ammo.");
    });

    test("parse() funcs", () => {
        expect(parser.parse(["message","This is a test"])).toEqual({message: "This is a test"});
        expect(parser.parse(["broadcast","This is a test"])).toEqual({broadcast: "This is a test"});
        expect(parser.parse(["contains","This is a test", "This"])).toBeTruthy();
        expect(parser.parse(["variable","This is a test"])).toBeTruthy();
        expect(parser.parse(["command","go north"], "go north")).toBeTruthy();
    });
});