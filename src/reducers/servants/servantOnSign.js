import {MODES} from "../../constants";
import {wrapperArg, getArrLogText, toDisplayText, toFloat } from "../utils";

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
        
        firstNumber *= -1;
        displayText = toDisplayText( firstNumber );

        ///FIXME: Delete a block at the end of tests
        /*if( firstNumber === 0 ){
            arrLogText = getArrLogText(  arrLogText, wrapperArg( firstNumber, arrLogText.pop(), 'negate' ));
        } else{
            arrLogText = [];
        }*/

        arrLogText = [];
    } else if( mode === MODES.FIRST_OPERATOR ) {

        mode = MODES.LAST_NUMBER;
        lastNumber = firstNumber * -1;
        arrLogText = getArrLogText(  firstNumber, firstOperator, wrapperArg( displayText, arrLogText.pop(), 'negate' ) );
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


    } else if( mode === MODES.LAST_NUMBER ) {

        lastNumber *= -1;
        ///TODO: Remove it
       /* arrLogText = getArrLogText( arrLogText
                                        ,  wrapperArg( displayText
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
        , percentNumber
    };

}