import {MODES} from "../../constants";
import {getArrLogText, getOutput, toDisplayText} from "../utils";

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
            displayText = getOutput( "", firstNumber, onDot );
            arrLogText = getArrLogText( firstNumber );
        } else if ( mode === MODES.FIRST_OPERATOR ){
            ///TODO: Не забыть сократить число до N десятичных
            lastNumber = firstNumber * ( firstNumber / 100 );
            mode = MODES.LAST_NUMBER;
            arrLogText = getArrLogText( arrLogText, lastNumber );
            displayText = toDisplayText( lastNumber );
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