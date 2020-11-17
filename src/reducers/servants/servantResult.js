import {DIVISION_BY_ZERO_IS_NOT_POSSIBLE, MODES, SIMPLE_DIVISION, SIMPLE_RESULT} from "../../constants";
import {getArrLogText, getResult, argumentOfWrap, toFloat, toDisplayText, getSimpleOperator} from "../utils";

export default ( state )=>{

    let {displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , arrLogText
        , percentNumber
        , divisionByZeroBlocking
    } = state;


        if( mode > MODES.FIRST_OPERATOR && firstOperator !== SIMPLE_RESULT ){

            if( ( !lastNumber && mode < MODES.LAST_NUMBER ) || mode === MODES.MULTIPLE_ACTION ){
                lastNumber = toFloat( displayText );
                mode = MODES.LAST_NUMBER;
            }
            displayText = getResult( firstNumber, lastNumber, firstOperator );

            if( mode === MODES.AFTER_RESULT ){
                     arrLogText = getArrLogText(  firstNumber
                    , firstOperator
                    , lastNumber
                    , SIMPLE_RESULT );

                firstNumber = toFloat( displayText );
                percentNumber = firstNumber;
                /// если произведено деление на ноль
            } else if( mode === MODES.LAST_NUMBER
                && firstOperator === SIMPLE_DIVISION
                && lastNumber === 0 ){

                displayText = DIVISION_BY_ZERO_IS_NOT_POSSIBLE;
                divisionByZeroBlocking = true;
            } else {
                /// если после получения результата был нажат оператор процентов,
                // то лог будет иметь иметь не "стандартный" вид,
                // кол-во его ячеек будет нечетным т.к. в последней будет храниться число
                let firstArgument = arrLogText;
                let secondArgument = lastNumber;
                if( arrLogText.length > 1 && arrLogText.length%2 ){
                    firstArgument = arrLogText.slice( 0, -1 );
                    secondArgument = argumentOfWrap( arrLogText[ arrLogText.length - 1 ], lastNumber );
                } else if( arrLogText.length === 1 ){
                    firstArgument = [ arrLogText[ 0 ], getSimpleOperator( firstOperator )];
                    secondArgument = toDisplayText( lastNumber );
                }

                arrLogText = getArrLogText( firstArgument, secondArgument, SIMPLE_RESULT);

                firstNumber = toFloat( displayText );
                mode = MODES.AFTER_RESULT;
                percentNumber = firstNumber;
            }



        } else if( mode === MODES.FIRST_OPERATOR ) {
            lastNumber = toFloat( displayText );
            displayText = getResult( firstNumber, lastNumber, firstOperator );
            arrLogText = getArrLogText( argumentOfWrap( arrLogText[ 0 ], firstNumber )
                , firstOperator
                , lastNumber
                , SIMPLE_RESULT );
            firstNumber = toFloat( displayText );
            mode = MODES.AFTER_RESULT;
            percentNumber = firstNumber;
        } else {
            firstOperator = SIMPLE_RESULT;
            arrLogText = getArrLogText( firstNumber, firstNumber === 0 ? '' : SIMPLE_RESULT );
            percentNumber = firstNumber;
        }



    return{ ...state
        , displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , arrLogText
        , percentNumber
        , divisionByZeroBlocking
    };

}