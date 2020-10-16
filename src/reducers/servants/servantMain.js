import {MAIN_BACKSPACE, MAIN_CLEAR, MAIN_CLEAR_LAST, MODES} from "../../constants";
import {toFloat} from "../utils";
import {store} from "../index";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                    , percentNumber
                }, { type, value /*action*/})=>{

    switch ( value ) {

        case MAIN_CLEAR:
            displayText = store.displayText;
            firstNumber = store.firstNumber;
            lastNumber = store.lastNumber;
            mode = store.mode;
            firstOperator = store.firstOperator;
            arrLogText = store.arrLogText;
            percentNumber = store.percentNumber;

            break;

        case MAIN_CLEAR_LAST:

            if( mode === MODES.BEGIN_MODE
                || mode === MODES.AFTER_RESULT ){
                firstNumber = store.firstNumber;
                lastNumber = store.lastNumber;
                mode = store.mode;
                firstOperator = store.firstOperator;
                arrLogText = store.arrLogText;
                percentNumber = store.percentNumber;
            }
            else{
                lastNumber = store.lastNumber;
            }

            displayText = store.displayText;

            break;
        case MAIN_BACKSPACE:
            if( displayText !== "0" ){
                if( mode < MODES.AFTER_RESULT ){
                    displayText = displayText.slice( 0, -1 ) || "0";

                    if( mode < MODES.LAST_NUMBER )
                    {
                        firstNumber = toFloat( displayText );
                    }
                    else
                        lastNumber =  toFloat( displayText );
                }else {
                    firstNumber = toFloat( displayText );
                    arrLogText = [];
                }
            }
            break;

        default:
    }

    return{ displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
        , percentNumber
    };

}