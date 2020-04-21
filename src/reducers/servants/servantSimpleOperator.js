import {MODES} from "../../constants";
import {getArrLogText, getResult, toFloat} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                }, { type, value /*action*/})=>{

        onDot = false;
        if( mode === MODES.BEGIN_MODE
            || mode === MODES.AFTER_RESULT
            || mode === MODES.FIRST_OPERATOR ){
            arrLogText = getArrLogText( firstNumber
                , value );
            mode = MODES.FIRST_OPERATOR;

        } else if(  mode !== MODES.MULTIPLE_ACTION ){
            displayText = getResult( firstNumber, lastNumber, firstOperator );
            firstNumber = toFloat( displayText );

            if( mode === MODES.LAST_NUMBER ){

                arrLogText = getArrLogText( arrLogText
                    , lastNumber
                    , value);

                mode = MODES.MULTIPLE_ACTION;
            } else{
                arrLogText = getArrLogText( arrLogText
                    , firstNumber
                    , value
                    , lastNumber
                    , value );

                mode = MODES.FIRST_OPERATOR;
            }

        }


        firstOperator = value;
        lastNumber = 0;

    return{ displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}