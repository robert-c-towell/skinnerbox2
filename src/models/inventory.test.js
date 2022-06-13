import Inventory from "./inventory.js";

describe("Inventory model", () => {
    it("should create an Inventory", () => {
        let i = new Inventory();
        expect(i).toBeTruthy();
        expect(i).toBeInstanceOf(Inventory);
    });

    describe("add()", () => {
        it("should only hold items", () => {
            let notAnItem = {};
            let i = new Inventory();
            expect(() => i.add(notAnItem)).toThrow();
        });
    
        it("should not allow adding if it is full", () => {
            let notAnItem = {}; // TODO: use valid item
            let i = new Inventory();
            i.size = 0;
            expect(i.add(notAnItem)).toBeFalsy();
        });
    
        it("should allow adding if it is not full", () => {
            let notAnItem = {}; // TODO: use valid item
            let i = new Inventory();
            expect(i.add(notAnItem)).toBeTruthy();
        });
    });

    describe("remove()", () => {
        it("should not allow removing if item is not present", () => {
            let notAnItem = {
                id: 1
            }; // TODO: use valid item
            let i = new Inventory();
            expect(i.remove(notAnItem.id)).toBeFalsy();
        });

        it("should allow removing if item is present", () => {
            let notAnItem = {
                id: 1
            }; // TODO: use valid item
            let i = new Inventory();
            i.add(notAnItem);
            expect(i.remove(notAnItem.id)).toBeTruthy();
        });
    });
});