//TODO: use fake classes for testing
import Player from "../objects/player.js";
import Inventory from "../objects/inventory.js";
import Item from "../objects/item.js";
import Location from "../objects/location.js";
import Event from "../objects/event.js";
import Effect from "../objects/effect.js";
//import NPC from "../objects/npc.js";
import TransformAdventure from "./transform-adventure.js";

// describe("Transform Adventure lib", () => {
//     let transformAdventure;
//     beforeAll(() => {
//         transformAdventure = new TransformAdventure(Player, Location, Event, Inventory, Item, Effect);
//     });

//     it("should convert a document to objects", () => {
//         let objects = transformAdventure.toObjects({});
//         expect(objects).toBeTruthy();
//     });

//     it("should convert objects to a document", () => {
//         let document = transformAdventure.toDocument(null, null, null, null, null, null);
//         expect(document).toBeTruthy();
//     });
// });