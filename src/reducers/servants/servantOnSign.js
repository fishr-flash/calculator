import {MODES} from "../../constants";
import {getArrLogText, toDisplayText, toFloat, updateArrLogText, wrapperArg} from "../utils";

export default ( state )=>{

    let {displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , arrLogText
    } = state;

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
        arrLogText = updateArrLogText( arrLogText, displayText, 'negate');
        displayText = toDisplayText( lastNumber );

    } else if( mode === MODES.AFTER_RESULT ){
        firstNumber = toFloat( displayText ) * -1;

        const expression = arrLogText.length > 1 ? displayText : arrLogText[ 0 ];
        arrLogText = getArrLogText( ` ${ wrapperArg( expression, 'negate' ) } ` );
        displayText = toDisplayText( firstNumber );
    } else if( mode === MODES.LAST_NUMBER ) {
        arrLogText = updateArrLogText( arrLogText, lastNumber, 'negate');
        lastNumber *= -1;
        displayText = toDisplayText( lastNumber );
    }

    return{ ...state
            , displayText
            , firstNumber
            , lastNumber
            , mode
            , firstOperator
            , arrLogText
    };

}