import ExecutorInterface from "./executor-interface.js";
import Evaluator from "./evaluator.js";
import Parser from "./parser.js";

import adventure from "../../design/example_adventure.json";

describe("Parser", () => {
    let parser;
    let evaluator;
    let playerName = "zeus";

    beforeAll(() => {
        let executorInterface = new ExecutorInterface(adventure);
        evaluator = new Evaluator(executorInterface);
        parser = new Parser(adventure, evaluator);
    })

    test("constructor() should create a Parser", () => {
        expect(parser).toBeTruthy();
        expect(parser).toBeInstanceOf(Parser);
        expect(() => new Parser()).toThrow();
        expect(() => new Parser(adventure)).toThrow();
        expect(() => new Parser(null, evaluator)).toThrow();
    });

    test("parse() should require an instruction and the player name", () => {
        expect(() => parser.parse()).toThrow();
        expect(() => parser.parse(7)).toThrow();
        expect(() => parser.parse([1,2,3])).toThrow();
        expect(() => parser.parse({ a: 1})).toThrow();
        expect(() => parser.parse("help")).toThrow();
        expect(() => parser.parse("help",7)).toThrow();
        expect(() => parser.parse("exit",[1,2,3])).toThrow();
        expect(() => parser.parse("exit",{ a: 1})).toThrow();
    });

    test("parse() should handle basic instructions", () => {
        expect(parser.parse("help", playerName)).toBeTruthy();
        expect(parser.parse("exit", playerName)).toBeTruthy();
        expect(parser.parse("save", playerName)).toBeTruthy();
        expect(parser.parse("commands", playerName)).toBeTruthy();
    });

    test("parse() should handle movement instructions", () => {
        expect(parser.parse("go north", playerName)).toBeTruthy();
        expect(parser.parse("climb ladder", playerName)).toBeTruthy();
    });

    test("parse() should handle object interactions", () => {
        expect(parser.parse("wear helmet", playerName)).toBeTruthy();
        expect(parser.parse("push button", playerName)).toBeTruthy();
        expect(parser.parse("pull lever", playerName)).toBeTruthy();
        expect(parser.parse("get flask", playerName)).toBeTruthy();
        expect(parser.parse("drop candle", playerName)).toBeTruthy();
        expect(parser.parse("throw axe at target", playerName)).toBeTruthy();
        expect(parser.parse("cut tree with chainsaw", playerName)).toBeTruthy();
        expect(parser.parse("break glass", playerName)).toBeTruthy();
    });
});