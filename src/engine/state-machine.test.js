import Event, {EventTypes} from "./../objects/event.js";
import Inventory from "./../objects/inventory.js";
import Item from "./../objects/item.js";
import Location from "./../objects/location.js";
//import Player from "./../objects/player.js";
//import Settings from "./objects/settings.js";

import TransformAdventure from "../libs/transform-adventure.js";
import StateMachine from "./state-machine.js";
import adventure from "../../example_adventure.json";

describe("StateMachine", () => {
    let stateMachine;
    
    beforeAll(() => {
        let Player = {};
        let Settings = {};
        let transform = new TransformAdventure(Event, Inventory, Item, Location, Player, Settings);
        let a = transform.toObjects(adventure);
        stateMachine = new StateMachine(a);
    })
    
    test("should create a StateMachine", () => {
        expect(stateMachine).toBeTruthy();
        expect(stateMachine).toBeInstanceOf(StateMachine);
    });

    test("process() should require a message object.", () => {
        expect(() => stateMachine.process()).toThrow();
    });

    test("process() should return an array of messages for each player.", () => {
        let message = {
            player: "jared",
            input: "go north"
        }
        let response = stateMachine.process(message);
        expect(response).toBeTruthy();
        expect(response).toBeInstanceOf(Array);
    });
});