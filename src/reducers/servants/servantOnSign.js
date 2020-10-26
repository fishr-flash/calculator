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
        /// если в первой ячейке массива лога содержится выражение, напр 1/(10)
        if( arrLogText[ 0 ] !== undefined && isNaN( arrLogText[ 0 ] ) ){
            arrLogText = getArrLogText( wrapperArg( arrLogText[ 0 ], 'negate' ) );
        }
        firstNumber *= -1;
        displayText = toDisplayText( firstNumber );
        //percentNumber = firstNumber;
        //arrLogText = [];
    } else if( mode === MODES.FIRST_OPERATOR ) {

        mode = MODES.LAST_NUMBER;
        lastNumber = firstNumber * -1;
        arrLogText = getArrLogText(  firstNumber, firstOperator, wrapperArg( displayText, 'negate' ) );
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
            ///FIXME: mode = MODES.LAST_NUMBER;

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