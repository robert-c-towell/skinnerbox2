import Item from "./item.js";

describe("Item object", () => {
    let item;

    beforeEach(() => {
        item = new Item();
    });

    it("should create an Item", () => {
        expect(item).toBeTruthy();
        expect(item).toBeInstanceOf(Item);
    });

    it("should return an object subset of the Item", () => {
        let props = item.getSettableProps();
        expect(props).toBeTruthy();
        expect(item).toMatchObject(props);
    });
});

