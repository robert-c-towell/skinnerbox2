import Event, {EventTypes} from "./objects/event.js";
import Parser, { Operators as Op } from "./libs/parser.js"

import adventure from "../example_adventure.json";
import StateExecutor from "./engine/state-executor.js";

try {
    let s = new StateExecutor(adventure);
    let a = s.getProperty();

    // let s = i.getSettableProps();

    // i.add(1);
    // i.add(2);

    // console.log(i.toString());
    // console.log(`type of i: ${typeof(i)}`);

    // console.log(i.items);
    // i.size = 20;
    // console.log(i.size);
} catch (ex) {
    console.error(ex);
}