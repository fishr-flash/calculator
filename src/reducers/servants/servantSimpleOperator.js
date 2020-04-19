import {MODES, SIMPLE_REMOVE, SIMPLE_RESULT} from "../../constants";
import {toFloat, getArrLogText, getResult, formatDisplayText} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                }, { type, value /*action*/})=>{

    onDot = false;
    if( value === SIMPLE_REMOVE ){

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
    else if( value === SIMPLE_RESULT ){
        if( mode >= MODES.FIRST_OPERATOR ){

            if( ( !lastNumber && mode < MODES.LAST_NUMBER ) || mode === MODES.MULTIPLE_ACTION ){
                lastNumber = toFloat( displayText );
                mode = MODES.LAST_NUMBER;
            }
            displayText = getResult( firstNumber, lastNumber, firstOperator );
            if( mode === MODES.AFTER_RESULT ){

                arrLogText = getArrLogText( firstNumber
                    , firstOperator
                    , lastNumber
                    , SIMPLE_RESULT );
            }
            else{
                arrLogText = getArrLogText( arrLogText
                    , arrLogText[ arrLogText.length - 1 ].includes( 'negate') ? '' : lastNumber
                    , SIMPLE_RESULT);
            }

            firstNumber = toFloat( displayText );
            mode = MODES.AFTER_RESULT;

        } else {
            arrLogText = getArrLogText( firstNumber, SIMPLE_RESULT );
        }



    } else {


        ////////////////// ANOTHER SIMPLE OPERATORS //////////////////////////

        onDot = false;
        if( mode === MODES.BEGIN_MODE
            || mode === MODES.AFTER_RESULT
            || mode === MODES.FIRST_OPERATOR ){
            arrLogText = getArrLogText( firstNumber
                , value );
            mode = MODES.FIRST_OPERATOR;
        } else if(  mode === MODES.MULTIPLE_ACTION ){
            ///nothing

        } else {
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

    }


    return{ displayText: formatDisplayText( displayText )
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}