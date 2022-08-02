//TODO: use fake classes for testing
import Item from "../objects/item.js";
import Scene from "../objects/scene.js";
import Event from "../objects/event.js";
import TransformAdventure from "./transform-adventure.js";
//import Player from "./../objects/player.js";
//import Settings from "./objects/settings.js";

import adventure from "../../example_adventure.json";

describe("Transform Adventure lib", () => {
    let transformAdventure;
    beforeAll(() => {
        let Player = {};
        let Settings = {};
        transformAdventure = new TransformAdventure(Event, Item, Scene, Player, Settings);
    });

    it("should convert a document to objects", () => {
        let objects = transformAdventure.toObjects(adventure);
        expect(objects).toBeTruthy();
    });

    // it("should convert objects to a document", () => {
    //     let document = transformAdventure.toDocument(null, null, null, null, null, null);
    //     expect(document).toBeTruthy();
    // });

    // test("toDocument() ", () => {
    //     expect(transformAdventure.toDocument()).toBeTruthy();
    // });

    // test("toObjects() ", () => {
    //     expect(transformAdventure.toObjects(adventure)).toBeTruthy();
    // });
});