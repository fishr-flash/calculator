import {MAIN_BACKSPACE, MODES} from "../../constants";
import {toFloat} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                }, { type, value /*action*/})=>{

    onDot = false;
    if( value === MAIN_BACKSPACE ){

        if( displayText !== "0" ){
            if( mode < MODES.AFTER_RESULT ){
                displayText = displayText.slice( 0, -1 ) || "0";

                if( mode < MODES.LAST_NUMBER )
                    firstNumber = toFloat( displayText );
                else
                    lastNumber =  toFloat( displayText );
            }else {
                firstNumber = toFloat( displayText );
                arrLogText = [];
            }
        }
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