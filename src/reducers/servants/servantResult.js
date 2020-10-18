import {MODES, SIMPLE_RESULT} from "../../constants";
import {getArrLogText, getResult, selectNumber, toFloat} from "../utils";

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
        


        if( mode > MODES.FIRST_OPERATOR && firstOperator !== SIMPLE_RESULT ){

            if( ( !lastNumber && mode < MODES.LAST_NUMBER ) || mode === MODES.MULTIPLE_ACTION ){
                lastNumber = toFloat( displayText );
                mode = MODES.LAST_NUMBER;
            }
            displayText = getResult( firstNumber, lastNumber, firstOperator );

            if( mode === MODES.AFTER_RESULT ){
                arrLogText = getArrLogText( selectNumber( firstNumber, arrLogText[ 0 ])
                    , firstOperator
                    , lastNumber
                    , SIMPLE_RESULT );
            } else {
                /// если после получения результата был нажат оператор процентов,
                // то лог будет иметь иметь не "стандартный" вид,
                // кол-во его ячеек будет нечетным т.к. в последней будет храниться число
                arrLogText = getArrLogText( arrLogText.length%2 ? arrLogText.slice( 0, -1 ) : arrLogText
                    , selectNumber( lastNumber, arrLogText[ arrLogText.length - 1 ])
                    , SIMPLE_RESULT);
            }

            firstNumber = toFloat( displayText );
            mode = MODES.AFTER_RESULT;

        } else if( mode === MODES.FIRST_OPERATOR ) {
            lastNumber = toFloat( displayText );
            displayText = getResult( firstNumber, lastNumber, firstOperator );
            arrLogText = getArrLogText( selectNumber( firstNumber, arrLogText[ 0 ])
                , firstOperator
                , lastNumber
                , SIMPLE_RESULT );
            firstNumber = toFloat( displayText );
            mode = MODES.AFTER_RESULT;
        } else {
            ///TODO: Закомментированно экспериментально, пока не ясно приведет ли это к багу
            //firstNumber = toFloat( displayText );
            //firstOperator = SIMPLE_RESULT;
            arrLogText = getArrLogText( firstNumber, SIMPLE_RESULT );
            //mode = MODES.FIRST_OPERATOR;
        }

        percentNumber = firstNumber;

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