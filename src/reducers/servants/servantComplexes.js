//const DIVISION_WARNING = 'Деление на ноль невозможно';

import {COMPLEXES_DIVISION_X, DIVISION_BY_ZERO_IS_NOT_POSSIBLE, MODES} from "../../constants";
import {getArrLogText, argumentOfWrap, toDisplayText, wrapperArg} from "../utils";

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
                        , ""
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
                lastNumber = 1 / firstNumber;
                arrLogText = getArrLogText( arrLogText, wrapperArg( firstNumber, "", '1/'));
                displayText = toDisplayText( lastNumber );
                mode = MODES.LAST_NUMBER;
            } else if( mode === MODES.LAST_NUMBER ){
                arrLogText = getArrLogText( arrLogText, wrapperArg( lastNumber, "", '1/'));
                lastNumber = 1 / lastNumber;
                displayText = toDisplayText( lastNumber );
            } else if( mode === MODES.AFTER_RESULT ){
                arrLogText = [ wrapperArg( firstNumber, "", '1/') ];
                firstNumber = 1 / firstNumber;
                displayText = toDisplayText( firstNumber );
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