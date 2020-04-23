import {MODES} from "../../constants";
import {applyNegates, getArrLogText, toDisplayText, toFloat} from "../utils";

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
        displayText = toDisplayText( firstNumber );

        if( firstNumber === 0 ){
            arrLogText = getArrLogText(  arrLogText, applyNegates( firstNumber, arrLogText.pop() ));
        } else{
            arrLogText = [];
        }
    } else if( mode === MODES.FIRST_OPERATOR ) {

        mode = MODES.LAST_NUMBER;
        lastNumber = firstNumber * -1;
        arrLogText = getArrLogText(  firstNumber, firstOperator, applyNegates( displayText, arrLogText.pop() ) );
        displayText = toDisplayText( lastNumber );


    } else if( mode === MODES.MULTIPLE_ACTION ) {
        lastNumber = toFloat( displayText ) * -1;
         arrLogText = getArrLogText(  arrLogText
             ,  applyNegates( displayText
                 , arrLogText.length%2 ? arrLogText.pop() : '' )  );

        displayText = toDisplayText( lastNumber );

    } else if( mode === MODES.AFTER_RESULT ){
            firstNumber = toFloat( displayText ) * -1;
            arrLogText = getArrLogText( ` ${ applyNegates( displayText , arrLogText.pop() ) } ` );
            displayText = toDisplayText( firstNumber );


    } else if( mode === MODES.LAST_NUMBER ) {

        lastNumber *= -1;
        ///TODO: Remove it
       /* arrLogText = getArrLogText( arrLogText
                                        ,  applyNegates( displayText
                                                        , arrLogText.length%2 ? arrLogText.pop() : '' )  );*/
        displayText = toDisplayText( lastNumber );

        ///TODO: arrLogText.join( " " ) text-align = right
    }

    return{ displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}