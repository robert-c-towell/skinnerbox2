import Inventory from "./objects/inventory.js";
import Event, {EventTypes} from "./objects/event.js";

try {
    let i = new Inventory();

    let s = i.getSettableProps();

    i.add(1);
    i.add(2);

    console.log(i.toString());
    console.log(`type of i: ${typeof(i)}`);
    console.log(`type of Inventory: ${typeof(i)}`);

    console.log(i.items);
    i.size = 20;
    console.log(i.size);
} catch (ex) {
    console.error(ex);
}