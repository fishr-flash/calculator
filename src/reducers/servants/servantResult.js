import {MODES, SIMPLE_RESULT} from "../../constants";
import {firstArgument, getArrLogText, getResult, toFloat} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                })=>{


        onDot = false;

        if( mode > MODES.FIRST_OPERATOR && firstOperator !== SIMPLE_RESULT ){

            if( ( !lastNumber && mode < MODES.LAST_NUMBER ) || mode === MODES.MULTIPLE_ACTION ){
                lastNumber = toFloat( displayText );
                mode = MODES.LAST_NUMBER;
            }
            displayText = getResult( firstNumber, lastNumber, firstOperator );

            if( mode === MODES.AFTER_RESULT ){

                arrLogText = getArrLogText( firstArgument( firstNumber, arrLogText[ 0 ])
                    , firstOperator
                    , lastNumber
                    , SIMPLE_RESULT );
            }
            else{
                arrLogText = getArrLogText( arrLogText
                    ///TODO: эта инструкция нерабочая надо поправить
                    , arrLogText[ arrLogText.length - 1 ].includes( 'negate') ? '' : lastNumber
                    , SIMPLE_RESULT);
            }

            firstNumber = toFloat( displayText );
            mode = MODES.AFTER_RESULT;

        } else {

            firstNumber = toFloat( displayText );
            firstOperator = SIMPLE_RESULT;
            arrLogText = getArrLogText( firstNumber, firstOperator );
            mode = MODES.FIRST_OPERATOR;

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