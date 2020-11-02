import {MODES, NOT_OPERATOR, SIMPLE_RESULT} from "../../constants";
import {getArrLogText, getOutput, toDisplayText, toFloat, wasWrapped} from "../utils";
import {store} from "../index";

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
                }, { type, value /*action*/})=>{

    if( mode === MODES.AFTER_RESULT ){
        firstNumber = value;
        lastNumber = store.lastNumber;
        mode = store.mode;
        firstOperator = store.firstOperator;
        arrLogText = store.arrLogText;
        displayText = getOutput( '', value, onDot );

    } else if( mode === MODES.FIRST_OPERATOR  ){
        displayText = getOutput( lastNumber.toString(), value, onDot );
        lastNumber = toFloat( displayText );
        mode = MODES.LAST_NUMBER;

    } else if ( mode === MODES.MULTIPLE_ACTION ){

        // Нам нужно установить является ли число которое мы хотим поправить
        // "обернутым", но мы не знаем что хранится в последней ячейке массива
        // лога, ранее введенные цифры или знак арифм. действия ( если число только
        // начало формироваться), зная, что операторы всегда хранятся в четных ячейках
        // проверяем является ли последняя ячейка нечетной, если да - там хранится число
        // которое можно проверять на "обернутость"
        if( arrLogText.length%2 && isNaN( toFloat(  arrLogText[ arrLogText.length - 1] )) ){
            lastNumber = value;
            displayText =lastNumber.toString();
            arrLogText = getArrLogText( arrLogText.slice( 0, -1 ) );
        } else {
            displayText = getOutput( lastNumber.toString(), value, onDot );
            lastNumber = toFloat( displayText );
        }

        mode = MODES.LAST_NUMBER;

    } else if ( mode === MODES.LAST_NUMBER ){
        /// если к числу был применен сложный оператор
        if(  numberIsWrapped ){

            displayText = toDisplayText( value );
            lastNumber = value;
            if( wasWrapped( arrLogText[ arrLogText.length - 1] ) )
                                                        arrLogText.pop();
        }else{
            displayText = getOutput( displayText, value, onDot );
            lastNumber = toFloat( displayText );
        }
    } else {
        if( firstOperator === SIMPLE_RESULT ){
            firstNumber = value;
            displayText = toDisplayText( firstNumber );
            firstOperator = NOT_OPERATOR;

        } else {/// mode < MODES.FIRST_OPERATOR
            /// если к числу был применен сложный оператор
            if(  numberIsWrapped ){
                displayText = toDisplayText( value );
                firstNumber = value;

            } else {
                displayText = getOutput( displayText, value, onDot );
                firstNumber = toFloat( displayText );
            }

        }

    }

    ///FIXME: Везде отменить onDOT = false, флаг должен обнуляться только в местах изменения числа
    onDot = false;
    numberIsWrapped = false;
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
    };

}