import Item from "./item.js";

describe("Item model", () => {
    test("should create an Item", () => {
        let i = new Item();
        expect(i).toBeTruthy();
        expect(i).toBeInstanceOf(Item);
    });
});