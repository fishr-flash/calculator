import {MODES} from "../../constants";
import {getArrLogText, toDisplayText, toFloat, wrapperArg} from "../utils";

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

    if( mode < MODES.FIRST_OPERATOR ){
        
        firstNumber *= -1;
        displayText = toDisplayText( firstNumber );
        arrLogText = [];
    } else if( mode === MODES.FIRST_OPERATOR ) {

        mode = MODES.LAST_NUMBER;
        lastNumber = firstNumber * -1;
        arrLogText = getArrLogText(  firstNumber, firstOperator, wrapperArg( displayText, arrLogText.pop(), 'negate' ) );
        displayText = toDisplayText( lastNumber );


    } else if( mode === MODES.MULTIPLE_ACTION ) {
        lastNumber = toFloat( displayText ) * -1;
         arrLogText = getArrLogText(  arrLogText
             ,  wrapperArg( displayText
                 , arrLogText.length%2 ? arrLogText.pop() : '', 'negate' )  );

        displayText = toDisplayText( lastNumber );

    } else if( mode === MODES.AFTER_RESULT ){
            firstNumber = toFloat( displayText ) * -1;
            arrLogText = getArrLogText( ` ${ wrapperArg( displayText , arrLogText.pop(), 'negate' ) } ` );
            displayText = toDisplayText( firstNumber );


    } else if( mode === MODES.LAST_NUMBER ) {

        lastNumber *= -1;
        displayText = toDisplayText( lastNumber );
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