import {MODES} from "../../constants";
import {toFloat, getOutput} from "../utils";
import { store } from "../index";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                }, { type, value /*action*/})=>{

    if( mode === MODES.AFTER_RESULT ){
        displayText = store.displayText;
        firstNumber = store.firstNumber;
        lastNumber = store.lastNumber;
        mode = store.mode;
        firstOperator = store.firstOperator;
        onDot = store.onDot;

    }

    if( mode === MODES.FIRST_OPERATOR || mode === MODES.MULTIPLE_ACTION ){
        displayText = getOutput( lastNumber.toString(), value, onDot );
        lastNumber = toFloat( displayText );
        mode = MODES.LAST_NUMBER;

    } else if ( mode === MODES.LAST_NUMBER ){
        displayText = getOutput( displayText, value, onDot );
        lastNumber = toFloat( displayText );
    } else {
        displayText = getOutput( displayText, value, onDot );
        firstNumber = toFloat( displayText );
    }

    return{ displayText: `${displayText}`.replace(".", ",")
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}