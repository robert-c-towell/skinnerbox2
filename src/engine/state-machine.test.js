import Event, {EventTypes} from "./../objects/event.js";
import Inventory from "./../objects/inventory.js";
import Item from "./../objects/item.js";
import Location from "./../objects/location.js";

import StateMachine from "./state-machine.js";

describe("StateMachine", () => {
    let stateMachine;
    
    beforeAll(() => {
        stateMachine = new StateMachine();
    })
    
    test("should create a StateMachine", () => {
        expect(stateMachine).toBeTruthy();
        expect(stateMachine).toBeInstanceOf(StateMachine);
    });

    test("process() should return a list of messages for each player.", () => {
        
    });
});