import {MODES} from "../../constants";
import {getArrLogText, getOutput, toFloat} from "../utils";
import {store} from "../index";

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

    if( mode === MODES.FIRST_OPERATOR  ){
        displayText = getOutput( lastNumber.toString(), value, onDot );
        lastNumber = toFloat( displayText );
        mode = MODES.LAST_NUMBER;

    } else if ( mode === MODES.MULTIPLE_ACTION ){

        if( arrLogText[ arrLogText.length - 1].includes( 'negate' )){
            lastNumber = value;
            displayText =lastNumber;
            arrLogText = getArrLogText( arrLogText.slice( 0, -1 ) );
        } else {
            displayText = getOutput( lastNumber.toString(), value, onDot );
            lastNumber = toFloat( displayText );
        }

        mode = MODES.LAST_NUMBER;

    } else if ( mode === MODES.LAST_NUMBER ){
        displayText = getOutput( displayText, value, onDot );
        lastNumber = toFloat( displayText );
    } else {
        displayText = getOutput( displayText, value, onDot );
        firstNumber = toFloat( displayText );
    }

    return{ displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}