import {MEMORY_CLEAR, MEMORY_LIST, MEMORY_MINUS, MEMORY_PLUS, MEMORY_READ, MEMORY_SAVE, MODES} from "../../constants";
import {toDisplayText, toFloat} from "../utils";

export default ( state, action, )=>{

    let {displayText
        , firstNumber
        , lastNumber
        , mode
        , arrMemory
        , arrLogText
        , numberIsWrapped
        , memoryListOnOpen
    } = state;

    const { value } = action;


    return{ ...state
        ,displayText
        , firstNumber
        , lastNumber
        , mode
        , arrMemory
        , arrLogText
        , numberIsWrapped
        , memoryListOnOpen
    };

}