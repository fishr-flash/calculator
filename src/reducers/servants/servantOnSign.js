import {MODES} from "../../constants";
import {applyNegates, toFloat, getArrLogText, formatDisplayText} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                }, { type, value /*action*/})=>{

    if( mode < MODES.FIRST_OPERATOR ){
        
        firstNumber *= -1;
        displayText = firstNumber.toString();

        if( firstNumber === 0 ){
            arrLogText = getArrLogText(  arrLogText, applyNegates( firstNumber, arrLogText.pop() ));
        } else{
            arrLogText = [];
        }
    } else if( mode === MODES.FIRST_OPERATOR ) {

        mode = MODES.LAST_NUMBER;
        lastNumber = firstNumber * -1;
        displayText = lastNumber;
        arrLogText = getArrLogText(  firstNumber, firstOperator, applyNegates( firstNumber, arrLogText.pop() ) );

    } else if( mode === MODES.MULTIPLE_ACTION ) {
        lastNumber = toFloat( displayText ) * -1;
        displayText = lastNumber;
        arrLogText = getArrLogText(  arrLogText
                                    , applyNegates(
                                            lastNumber * -1
                                            , arrLogText[ arrLogText.length - 1].includes( 'negate')
                                                                            ? arrLogText.pop() : '') );
    } else if( mode === MODES.AFTER_RESULT ){
            firstNumber = toFloat( displayText ) * -1;
            arrLogText = getArrLogText( ` ${ applyNegates( firstNumber * -1, arrLogText.pop() ) } ` );
            displayText = firstNumber;


    } else if( mode === MODES.LAST_NUMBER ) {

        lastNumber *= -1;
        displayText = lastNumber;

        ///TODO: arrLogText.join( " " ) text-align = right
    }

    return{ displayText: formatDisplayText( displayText )
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}