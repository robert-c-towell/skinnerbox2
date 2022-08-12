import Event, {EventTypes} from "./objects/event.js";
import Parser, { Operators as Op } from "./libs/parser.js"

import adventure from "../design/example_adventure.json";
import Executor from "./engine/state-executor.js";

try {
    let s = new Executor(adventure);
    let a = s.getProperty();

    // let s = i.getSettableVariables();

    // i.add(1);
    // i.add(2);

    // console.log(i.toString());
    // console.log(`type of i: ${typeof(i)}`);

    // console.log(i.props);
    // i.size = 20;
    // console.log(i.size);
} catch (ex) {
    console.error(ex);
}