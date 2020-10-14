import {MODES} from "../../constants";
import {getArrLogText, roundNum, toDisplayText, toFloat} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                    , percentNumber
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
            percentNumber = firstNumber;
        } else if ( mode === MODES.LAST_NUMBER ){
            lastNumber = roundNum( lastNumber * ( firstNumber / 100 ) );
            arrLogText = getArrLogText( arrLogText, lastNumber );
            displayText = toDisplayText( lastNumber );
            mode = MODES.AFTER_RESULT;
        } else if ( mode === MODES.AFTER_RESULT ){
            if( percentNumber === 0 ) percentNumber = firstNumber;
            displayText = toDisplayText( roundNum( toFloat( displayText ) * ( percentNumber / 100 ) ) );
            arrLogText = getArrLogText( displayText );
            lastNumber = 0;
            mode = MODES.AFTER_RESULT;
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