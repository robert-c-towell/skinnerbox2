import Parser, {Operators as Op} from "./parser.js";

describe("Parser lib", () => {
    let parser;
    
    beforeAll(() => {
        parser = Parser.create();
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

    test("parse() exists", () => {
        // Truthy
        expect(parser.parse(["name",Op.exists])).toBeTruthy();
        expect(parser.parse([Op["!"],[null,Op.exists]])).toBeTruthy();
        // Falsey
        expect(parser.parse([null,Op.exists])).toBeFalsy();
        expect(parser.parse([Op["!"],["name",Op.exists]])).toBeFalsy();
    });

    test("parse() boolean logic operators", () => {
        // Truthy
        expect(parser.parse([[1,Op["=="],1],Op["||"],[1,Op["=="],2]])).toBeTruthy();
        // Falsey
        expect(parser.parse([[1,Op["=="],1],Op["&&"],[1,Op["=="],2]])).toBeFalsy();
    });

    test("parse() concat", () => {
        expect(parser.parse(["concat","This is"," a test"])).toEqual("This is a test");
        expect(parser.parse(["concat","This ","is ","a ","test"])).toEqual("This is a test");
        expect(parser.parse(["concat","You have ",["+",2,1]," ammo."])).toEqual("You have 3 ammo.");
    });
});