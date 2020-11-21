//const DIVISION_WARNING = 'Деление на ноль невозможно';

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

    numberIsWrapped = true;

    switch ( value ) {

        case MEMORY_CLEAR:
            arrMemory = [];
            numberIsWrapped = false;
            break;
        case MEMORY_READ:
            const val = arrMemory[ arrMemory.length - 1 ];
            displayText = toDisplayText( val );
            if( mode === MODES.BEGIN_MODE
                || mode === MODES.AFTER_RESULT ){
                firstNumber = val;
            } else if(  mode === MODES.MULTIPLE_ACTION ){
                lastNumber = val;
                mode = MODES.LAST_NUMBER;
            } else {
                lastNumber = val;
            }

            break;
        case MEMORY_PLUS:
            if( arrMemory.length ){
                arrMemory[ arrMemory.length - 1 ] +=  toFloat( displayText );
            }else {
                arrMemory.push( toFloat( displayText ));
            }
            break;
        case MEMORY_MINUS:
            if( arrMemory.length ){
                arrMemory[ arrMemory.length - 1 ] -= toFloat( displayText );
            } else {
                arrMemory.push( toFloat( displayText ));
            }
            break;
        case MEMORY_SAVE:
            arrMemory.push( toFloat( displayText ));
            break;
        case MEMORY_LIST:
            memoryListOnOpen = true;
            break;

        default:
            throw new Error( "Unknown type memory option in the servantMemory ");
    }

    if( mode === MODES.AFTER_RESULT ){
        arrLogText = [];
    }

    return{ ...state
        ,displayText
        , firstNumber
        , lastNumber
        , mode
        , arrMemory
        , arrLogText
        , numberIsWrapped: numberIsWrapped
        , memoryListOnOpen
    };

}