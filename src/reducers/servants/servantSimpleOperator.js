import {MODES} from "../../constants";
import {getArrLogText, getResult, argumentOfWrap, toDisplayText, toFloat} from "../utils";

export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                    , percentNumber
                }, { type, value /*action*/})=>{

        onDot = false;
        if( mode < MODES.MULTIPLE_ACTION  ){
            displayText = toDisplayText( firstNumber );

                let firstPart = '';
                /// если попеременно нажимаются разные операторы
                if( mode === MODES.FIRST_OPERATOR && arrLogText.length ){
                    firstPart = arrLogText.slice( 0, -1 ) ;
                } else {
                    // если первый аргумент есть и он обернут выражение
                    firstPart = argumentOfWrap( arrLogText[ 0 ], firstNumber );

                }

            arrLogText = getArrLogText( firstPart
                , value );
            mode = MODES.FIRST_OPERATOR;

        } else if(   mode === MODES.AFTER_RESULT ){
            /// когда после получения результата был нажат backspace лог удаляется
            const selectedNumber = arrLogText.length ? argumentOfWrap( arrLogText[ 0 ], firstNumber ) : firstNumber;
            arrLogText = getArrLogText( selectedNumber
                , value );

            mode = MODES.FIRST_OPERATOR;
        } else if(  mode !== MODES.MULTIPLE_ACTION ){
            displayText = getResult( firstNumber, lastNumber, firstOperator );
            firstNumber = toFloat( displayText );

            if( mode === MODES.LAST_NUMBER ){
                /// в последовательности, например, 4, +, %, + сложится массив [ 4, +, 0,16, 0,16 ]
                arrLogText = getArrLogText( arrLogText.length%2 ? arrLogText.slice( 0, -1 ) : arrLogText
                    , lastNumber
                    , value);

                mode = MODES.MULTIPLE_ACTION;
            } else{
                arrLogText = getArrLogText( arrLogText
                    , firstNumber
                    , value
                    , lastNumber
                    , value );

                mode = MODES.FIRST_OPERATOR;
            }


        }

        lastNumber = 0;
        percentNumber = firstNumber;
        firstOperator = value;


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