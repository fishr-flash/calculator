//const DIVISION_WARNING = 'Деление на ноль невозможно';

import {COMPLEXES_DIVISION_X, MODES} from "../../constants";
import {getArrLogText, selectArgumentToWrap, toDisplayText, wrapperArg} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                    , percentNumber
                }, { type, value /*action*/})=>{

    switch ( value ) {

        case COMPLEXES_DIVISION_X:

            if( mode < MODES.FIRST_OPERATOR ){
                arrLogText = getArrLogText(
                                    wrapperArg(
                                        selectArgumentToWrap( arrLogText[ 0 ], firstNumber )
                                        , ""
                                        , "1/")
                            );
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
    };

}