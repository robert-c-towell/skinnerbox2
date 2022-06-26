import Parser, {Operators as Op} from "./parser.js";

describe("Parser lib", () => {
    let parser;
    
    beforeAll(() => {
        parser = new Parser();
    })
    
    test("should create an Parser", () => {
        expect(parser).toBeTruthy();
        expect(parser).toBeInstanceOf(Parser);
    });

    test("parse() should require conditions and it should be an array", () => {
        expect(() => parser.parse()).toThrow();
        expect(() => parser.parse("string")).toThrow();
        expect(() => parser.parse({ a: 1 })).toThrow();
    });

    test("parse() should handle comparison operators", () => {
        // Truthy
        expect(parser.parse([1,Op.EQUAL,1])).toBeTruthy();
        expect(parser.parse(["a",Op.EQUAL,"a"])).toBeTruthy();
        expect(parser.parse([1,Op.LESS_THAN,10])).toBeTruthy();
        expect(parser.parse([5,Op.GREATER_THAN,1])).toBeTruthy();
        expect(parser.parse([1,Op.LESS_THAN_OR_EQUAL,1])).toBeTruthy();
        expect(parser.parse([1,Op.GREATER_THAN_OR_EQUAL,1])).toBeTruthy();
        expect(parser.parse(["start",Op.NOT_EQUAL,"end"])).toBeTruthy();

        // Falsey
        expect(parser.parse([1,Op.EQUAL,2])).toBeFalsy();
        expect(parser.parse(["a",Op.EQUAL,"b"])).toBeFalsy();
        expect(parser.parse([10,Op.LESS_THAN,1])).toBeFalsy();
        expect(parser.parse([1,Op.GREATER_THAN,5])).toBeFalsy();
        expect(parser.parse([2,Op.LESS_THAN_OR_EQUAL,1])).toBeFalsy();
        expect(parser.parse([0,Op.GREATER_THAN_OR_EQUAL,1])).toBeFalsy();
        expect(parser.parse(["start",Op.NOT_EQUAL,"start"])).toBeFalsy();
    });

    test("parse() should handle valid but weird input", () => {
        expect(parser.parse([[1,Op.EQUAL,1],Op.EQUAL,true])).toBeTruthy();
    });

    test("parse() should handle exists", () => {
        // Truthy
        expect(parser.parse(["name",Op.EXISTS])).toBeTruthy();
        expect(parser.parse([null,Op.NOT_EXISTS])).toBeTruthy();
        // Falsey
        expect(parser.parse([null,Op.EXISTS])).toBeFalsy();
        expect(parser.parse(["name",Op.NOT_EXISTS])).toBeFalsy();
    });

    test("parse() should handle boolean logic operators", () => {
        // Truthy
        expect(parser.parse([[1,Op.EQUAL,1],Op.OR,[1,Op.EQUAL,2]])).toBeTruthy();
        // Falsey
        expect(parser.parse([[1,Op.EQUAL,1],Op.AND,[1,Op.EQUAL,2]])).toBeFalsy();
    });
});