import {MODES} from "../../constants";
import {getArrLogText, roundNum, toDisplayText} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                })=>{

        onDot = false;

        if( mode === MODES.BEGIN_MODE ){
            firstNumber = 0;
            displayText = toDisplayText( firstNumber );
            arrLogText = getArrLogText( firstNumber );
        } else if ( mode === MODES.FIRST_OPERATOR ){
            lastNumber = roundNum( firstNumber * ( firstNumber / 100 ) );
            mode = MODES.LAST_NUMBER;
            arrLogText = getArrLogText( arrLogText, lastNumber );
            displayText = toDisplayText( lastNumber );
        } else if ( mode === MODES.LAST_NUMBER ){
            lastNumber = roundNum( lastNumber * ( firstNumber / 100 ) );
            arrLogText = getArrLogText( arrLogText, lastNumber );
            displayText = toDisplayText( lastNumber );
            mode = MODES.AFTER_RESULT;
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