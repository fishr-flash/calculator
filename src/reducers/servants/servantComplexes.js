//const DIVISION_WARNING = 'Деление на ноль невозможно';

import {COMPLEXES_DIVISION_X, DIVISION_BY_ZERO_IS_NOT_POSSIBLE, MODES} from "../../constants";
import {getArrLogText, argumentOfWrap, toDisplayText, wrapperArg, updateArrLogText, toFloat} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                    , percentNumber
                    , divisionByZeroBlocking
                }, { type, value /*action*/})=>{

    switch ( value ) {

        case COMPLEXES_DIVISION_X:

            if( mode < MODES.FIRST_OPERATOR ){

                arrLogText = getArrLogText(
                    wrapperArg(
                        argumentOfWrap( arrLogText[ 0 ], firstNumber )
                        , "1/")
                );

                if( firstNumber === 0 ){
                    displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
                    divisionByZeroBlocking = true;
                } else {
                    firstNumber = 1 / firstNumber;
                    displayText = toDisplayText( firstNumber );
                }

            } else if( mode === MODES.FIRST_OPERATOR ){

                arrLogText = getArrLogText( arrLogText, wrapperArg( firstNumber,'1/'));

                if( firstNumber === 0 ){
                    displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
                    divisionByZeroBlocking = true;
                } else {
                    lastNumber = 1 / firstNumber;
                    displayText = toDisplayText( lastNumber );
                    mode = MODES.LAST_NUMBER;
                }

            } else if( mode === MODES.LAST_NUMBER ){
                arrLogText = updateArrLogText( arrLogText, lastNumber, '1/');
                if( lastNumber === 0 ){
                    displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
                    divisionByZeroBlocking = true;
                } else {
                    lastNumber = 1 / lastNumber;
                    displayText = toDisplayText( lastNumber );
                }

            } else if( mode === MODES.MULTIPLE_ACTION ){
                arrLogText = updateArrLogText( arrLogText, displayText, '1/');

                if( toFloat( displayText ) === 0 ){
                    displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
                    divisionByZeroBlocking = true;
                } else {
                    lastNumber = 1 / toFloat( displayText );
                    displayText = toDisplayText( lastNumber );
                }



            } else if( mode === MODES.AFTER_RESULT ){

                arrLogText = arrLogText.length > 1 ? [ wrapperArg( firstNumber, '1/') ]
                                                   : [ wrapperArg( arrLogText[ 0 ],'1/') ];
                if( firstNumber === 0 ){
                    displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
                    divisionByZeroBlocking = true;
                } else {
                    firstNumber = 1 / firstNumber;
                    displayText = toDisplayText( firstNumber );
                }

            }
            break;
        default:
    }

    return{ displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
        , percentNumber
        , divisionByZeroBlocking
    };

}