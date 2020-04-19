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
        displayText = firstNumber.toString();

        if( firstNumber === 0 ){
            arrLogText = getArrLogText(  arrLogText, applyNegates( firstNumber, arrLogText.pop() ));
        } else{
            arrLogText = [];
        }
        ///FIXME: -/+ /negate( 0 )/ | 1 /negate( 0 )/
        ///FIXME: 1+2+( -/+ )4 /1+2+4/ ( !1+2+negate( 3 )+4 )

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
            arrLogText = getArrLogText( ` ${ applyNegates( firstNumber * -1 ) } ` );
            displayText = firstNumber;


    } else if( mode === MODES.LAST_NUMBER ) {

        lastNumber *= -1;
        displayText = lastNumber;

        ///TODO: arrLogText.join( " " ) text-align = right
        ///TODO: remove it
        //arrLogText = getArrLogText( firstNumber, firstOperator,  `${ applyNegates( lastNumber, arrLogText.join( " " ) ) } ` );

    }
    ///TODO: remove it
    /*else {
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

    }*/



    return{ displayText: `${displayText}`.replace(".", ",")
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}