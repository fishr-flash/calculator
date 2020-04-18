import {MODES} from "../../constants";
import {applyNegates, toFloat, getArrLogText} from "../utils";

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
        displayText = firstNumber;
    } else if( mode === MODES.FIRST_OPERATOR ) {
        mode = MODES.LAST_NUMBER;
        lastNumber = firstNumber * -1;
        displayText = lastNumber;
        arrLogText = getArrLogText(  firstNumber, firstOperator, `negate( ${ Math.abs( lastNumber ) } )`);
    } else {
        if( mode === MODES.AFTER_RESULT ){
            firstNumber = toFloat( displayText ) * -1;
            displayText = firstNumber;
            arrLogText = getArrLogText( ` ${ applyNegates( firstNumber, arrLogText.join( " " ) ) } ` );

        } else if( mode === MODES.LAST_NUMBER ) {

            lastNumber *= -1;
            displayText = lastNumber;

            ///TODO: arrLogText.join( " " ) text-align = right
            arrLogText = getArrLogText( firstNumber, firstOperator,  `${ applyNegates( lastNumber, arrLogText.join( " " ) ) } ` );

        } else {
            lastNumber *= -1;
            displayText = lastNumber;

            if( arrLogText.join( " " ).includes( 'negate')){


                const countNegates = arrLogText.join( " " ).split( 'negate').length;

                let lastNegate = Math.abs( lastNumber );
                for (let i = 0; i < countNegates ; i++) {
                    lastNegate = `negate( ${ lastNegate } )`;
                }

                arrLogText = getArrLogText( lastNegate );
            }

        }

    }

    return{ displayText: `${displayText}`.replace(".", ",")
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}