import {MODES} from "../../constants";
import {getArrLogText, roundNum, toDisplayText, toFloat} from "../utils";

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

        if( mode === MODES.BEGIN_MODE ){
            firstNumber = 0;
            displayText = toDisplayText( firstNumber );
            arrLogText = getArrLogText( firstNumber );
        } else if ( mode === MODES.FIRST_OPERATOR ){
            lastNumber = roundNum( firstNumber * ( firstNumber / 100 ) );
            mode = MODES.LAST_NUMBER;
            arrLogText = getArrLogText( arrLogText, lastNumber );
            displayText = toDisplayText( lastNumber );
            percentNumber = firstNumber;
        } else if ( mode === MODES.LAST_NUMBER ){
            lastNumber = roundNum( lastNumber * ( firstNumber / 100 ) );

            // если и последующие нажатие на кнопку проценты, значит вторая цифра уже выведена в лог
            // ее надо заменить, если первое то лог заканчивается еще пока последним оператором
            arrLogText = getArrLogText( arrLogText.length%2 ? arrLogText.slice( 0, -1 ) : arrLogText, lastNumber );
            displayText = toDisplayText( lastNumber );
        } else if ( mode === MODES.AFTER_RESULT ){
            displayText = toDisplayText( roundNum( toFloat( displayText ) * ( firstNumber / 100 ) ) );
            //firstNumber = toFloat( displayText );
            arrLogText = getArrLogText( displayText );
            //lastNumber = 0;
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