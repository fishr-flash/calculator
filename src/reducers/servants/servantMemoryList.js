import {
    MEMORY_ELEMENT_CLEAR,
    MEMORY_ELEMENT_MINUS,
    MEMORY_ELEMENT_PLUS,
    MEMORY_LIST_ON_CLOSE,
    ON_MEMORY_LIST_CLEAR
} from "../../constants";
import {toFloat} from "../utils";

export default ( state, action, )=>{

    let {
        displayText
        , arrMemory
        , memoryListOnOpen
    } = state;

    const { value } = action;



    if( value === MEMORY_LIST_ON_CLOSE ){
        memoryListOnOpen = false;
    } else if ( value === ON_MEMORY_LIST_CLEAR ){
        arrMemory = [];
    } else {
        if( value.die === MEMORY_ELEMENT_CLEAR ){
            arrMemory.splice( value.id, 1 );
        } else if ( value.die === MEMORY_ELEMENT_PLUS ){
            arrMemory[ value.id ] += toFloat( displayText );
        } else if ( value.die === MEMORY_ELEMENT_MINUS ){
            arrMemory[ value.id ] -= toFloat( displayText );
        }
    }

    return{ ...state
        , arrMemory: [ ...arrMemory ]
        , memoryListOnOpen
    };

}