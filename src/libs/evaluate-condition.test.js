import EvaluateCondition, {Operators as Op} from "./evaluate-condition.js";

describe("EvaluateCondition lib", () => {
    let evaluateCondition;
    
    beforeAll(() => {
        evaluateCondition = new EvaluateCondition();
    })
    
    test("should create an EvaluateCondition", () => {
        expect(evaluateCondition).toBeTruthy();
        expect(evaluateCondition).toBeInstanceOf(EvaluateCondition);
    });

    test("evaluate() should require conditions and it should be an array", () => {
        expect(() => evaluateCondition.evaluate()).toThrow();
        expect(() => evaluateCondition.evaluate("string")).toThrow();
        expect(() => evaluateCondition.evaluate({ a: 1 })).toThrow();
    });

    test("evaluate() should handle comparison operators", () => {
        // Truthy
        expect(evaluateCondition.evaluate([1,Op.EQUAL,1])).toBeTruthy();
        expect(evaluateCondition.evaluate(["a",Op.EQUAL,"a"])).toBeTruthy();
        expect(evaluateCondition.evaluate([1,Op.LESS_THAN,10])).toBeTruthy();
        expect(evaluateCondition.evaluate([5,Op.GREATER_THAN,1])).toBeTruthy();
        expect(evaluateCondition.evaluate([1,Op.LESS_THAN_OR_EQUAL,1])).toBeTruthy();
        expect(evaluateCondition.evaluate([1,Op.GREATER_THAN_OR_EQUAL,1])).toBeTruthy();
        expect(evaluateCondition.evaluate(["start",Op.NOT_EQUAL,"end"])).toBeTruthy();

        // Falsey
        expect(evaluateCondition.evaluate([1,Op.EQUAL,2])).toBeFalsy();
        expect(evaluateCondition.evaluate(["a",Op.EQUAL,"b"])).toBeFalsy();
        expect(evaluateCondition.evaluate([10,Op.LESS_THAN,1])).toBeFalsy();
        expect(evaluateCondition.evaluate([1,Op.GREATER_THAN,5])).toBeFalsy();
        expect(evaluateCondition.evaluate([2,Op.LESS_THAN_OR_EQUAL,1])).toBeFalsy();
        expect(evaluateCondition.evaluate([0,Op.GREATER_THAN_OR_EQUAL,1])).toBeFalsy();
        expect(evaluateCondition.evaluate(["start",Op.NOT_EQUAL,"start"])).toBeFalsy();
    });

    test("evaluate() should handle valid but weird input", () => {
        expect(evaluateCondition.evaluate([[1,Op.EQUAL,1],Op.EQUAL,true])).toBeTruthy();
    });

    test("evaluate() should handle exists", () => {
        // Truthy
        expect(evaluateCondition.evaluate(["name",Op.EXISTS])).toBeTruthy();
        expect(evaluateCondition.evaluate([null,Op.NOT_EXISTS])).toBeTruthy();
        // Falsey
        expect(evaluateCondition.evaluate([null,Op.EXISTS])).toBeFalsy();
        expect(evaluateCondition.evaluate(["name",Op.NOT_EXISTS])).toBeFalsy();
    });

    test("evaluate() should handle boolean logic operators", () => {
        // Truthy
        expect(evaluateCondition.evaluate([[1,Op.EQUAL,1],Op.OR,[1,Op.EQUAL,2]])).toBeTruthy();
        // Falsey
        expect(evaluateCondition.evaluate([[1,Op.EQUAL,1],Op.AND,[1,Op.EQUAL,2]])).toBeFalsy();
    });
});