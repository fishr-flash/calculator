//const DIVISION_WARNING = 'Деление на ноль невозможно';

import {DIVISION_BY_ZERO_IS_NOT_POSSIBLE, MODES} from "../../constants";
import {
    argumentOfWrap,
    getArrLogText,
    getComplexesAttributes,
    toDisplayText,
    toFloat,
    updateArrLogText,
    wrapperArg
} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrMemory
                    , arrLogText
                    , percentNumber
                    , numberIsWrapped
                    , divisionByZeroBlocking
                }, { type, value /*action*/})=>{

    const { cOperation, wrapText } = getComplexesAttributes( value );

    if( mode < MODES.FIRST_OPERATOR ){

        arrLogText = getArrLogText(
            wrapperArg(
                argumentOfWrap( arrLogText[ 0 ], firstNumber )
                , wrapText)
        );

        if( firstNumber === 0 ){
            displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
            divisionByZeroBlocking = true;
        } else {
            firstNumber = cOperation( firstNumber );
            displayText = toDisplayText( firstNumber );
        }

    } else if( mode === MODES.FIRST_OPERATOR ){

        arrLogText = getArrLogText( arrLogText, wrapperArg( firstNumber,wrapText));

        if( firstNumber === 0 ){
            displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
            divisionByZeroBlocking = true;
        } else {
            lastNumber = cOperation( firstNumber );
            displayText = toDisplayText( lastNumber );
            mode = MODES.LAST_NUMBER;
        }

    } else if( mode === MODES.LAST_NUMBER ){
        arrLogText = updateArrLogText( arrLogText, lastNumber, wrapText);
        if( lastNumber === 0 ){
            displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
            divisionByZeroBlocking = true;
        } else {
            lastNumber = cOperation( lastNumber );
            displayText = toDisplayText( lastNumber );
        }

    } else if( mode === MODES.MULTIPLE_ACTION ){
        arrLogText = updateArrLogText( arrLogText, displayText, wrapText);

        if( toFloat( displayText ) === 0 ){
            displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
            divisionByZeroBlocking = true;
        } else {
            lastNumber = cOperation( toFloat( displayText ) );
            displayText = toDisplayText( lastNumber );
        }



    } else if( mode === MODES.AFTER_RESULT ){

        arrLogText = arrLogText.length > 1 ? [ wrapperArg( firstNumber, wrapText) ]
                                           : [ wrapperArg( arrLogText[ 0 ],wrapText) ];
        if( firstNumber === 0 ){
            displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
            divisionByZeroBlocking = true;
        } else {
            firstNumber = cOperation( firstNumber );
            displayText = toDisplayText( firstNumber );
        }

    }

    numberIsWrapped = true;

    return{ displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrMemory
        , arrLogText
        , percentNumber
        , numberIsWrapped
        , divisionByZeroBlocking
    };

}