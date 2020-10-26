import {MODES} from "../../constants";
import {getArrLogText, toDisplayText, toFloat, updateArrLogText, wrapperArg} from "../utils";

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
        ///FIXME: 1, +, 2, +, 1/x, +/- неправильно работает надо updateArrLogText
        lastNumber = toFloat( displayText ) * -1;
         /*arrLogText = getArrLogText(  arrLogText
             ,  wrapperArg( displayText, 'negate' )  );*/
        arrLogText = updateArrLogText( arrLogText, displayText, 'negate');
        displayText = toDisplayText( lastNumber );

    } else if( mode === MODES.AFTER_RESULT ){
        firstNumber = toFloat( displayText ) * -1;

        arrLogText = getArrLogText( ` ${ wrapperArg( displayText , 'negate' ) } ` );
        displayText = toDisplayText( firstNumber );
    } else if( mode === MODES.LAST_NUMBER ) {
        arrLogText = updateArrLogText( arrLogText, lastNumber, 'negate');
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