import {MODES} from "../../constants";
import {selectNumber, getArrLogText, getResult, toDisplayText, toFloat} from "../utils";

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
        if( mode === MODES.BEGIN_MODE
            || mode === MODES.FIRST_OPERATOR ){
            displayText = toDisplayText( firstNumber );
            arrLogText = getArrLogText( arrLogText.length ? arrLogText : firstNumber
                , value );
            mode = MODES.FIRST_OPERATOR;
            lastNumber = 0;
        } else if(   mode === MODES.AFTER_RESULT ){

            //arrLogText = getArrLogText(  arrLogText.length ? arrLogText[ 0 ] : firstNumber
            arrLogText = getArrLogText( selectNumber( firstNumber, arrLogText[ 0 ])
                , value );
            lastNumber = 0;////toFloat( displayText );
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