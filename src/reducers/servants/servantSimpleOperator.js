import {MODES} from "../../constants";
import {getArrLogText, getResult, selectNumber, toDisplayText, toFloat} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                    , percentNumber
                }, { type, value /*action*/})=>{

        onDot = false;
        if( mode < MODES.MULTIPLE_ACTION  ){
            displayText = toDisplayText( firstNumber );
            //const firstPart = mode === MODES.FIRST_OPERATOR ? arrLogText.length ? arrLogText.slice( 0, -1 ) : firstNumber : arrLogText.length ? arrLogText : firstNumber
            const firstPart = mode === MODES.FIRST_OPERATOR && arrLogText.length ? arrLogText.slice( 0, -1 ) : firstNumber;
            arrLogText = getArrLogText( firstPart
                , value );
            mode = MODES.FIRST_OPERATOR;
            lastNumber = 0;
        } else if(   mode === MODES.AFTER_RESULT ){
            arrLogText = getArrLogText( selectNumber( firstNumber, arrLogText[ 0 ])
                , value );
            lastNumber = 0;
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

            lastNumber = 0;
        }

        percentNumber = firstNumber;
        firstOperator = value;


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