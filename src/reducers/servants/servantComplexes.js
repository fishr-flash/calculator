//const DIVISION_WARNING = 'Деление на ноль невозможно';

import {COMPLEXES_DIVISION_X} from "../../constants";
import {getArrLogText, toDisplayText, wrapperArg} from "../utils";

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
                arrLogText = getArrLogText( wrapperArg( firstNumber, "", "1/") );
                firstNumber = 1 / firstNumber;
                displayText = toDisplayText( firstNumber );


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