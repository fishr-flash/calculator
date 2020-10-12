// import { combineReducers } from 'redux';
// import setNumber from "./setNumber";
import {
    MODES, ON_CLICK_COMPLEXES,
    ON_CLICK_DOT, ON_CLICK_MAIN,
    ON_CLICK_NUMBER, ON_CLICK_PERCENT,
    ON_CLICK_RESULT,
    ON_CLICK_SIGN,
    ON_CLICK_SIMPLE_OPERATOR
} from "../constants";
import servantOnSign from "./servants/servantOnSign";
import servantClickNumber from "./servants/servantClickNumber";
import servantOnDot from "./servants/servantOnDot";
import servantSimpleOperator from "./servants/servantSimpleOperator";
import servantResult from "./servants/servantResult";
import servantMain from "./servants/servantMain";
import servantComplexes from "./servants/servantComplexes";
import servantPercentOperator from "./servants/servantPercentOperator";

// export default combineReducers({ setNumber });

export const store = {
     displayText: "0"
    , firstNumber: 0
    , lastNumber: 0
    , mode: MODES.BEGIN_MODE
    , firstOperator: null
    , onDot: false
    , arrLogText: []

};

export default function reducer ( state = store, action ) {

    switch ( action.type ) {
        case ON_CLICK_RESULT:
            state = servantResult( state );
            break;
        case ON_CLICK_MAIN:
            state = servantMain( state, action );
            break;
        case ON_CLICK_DOT:
            state = servantOnDot( state, action );
            break;
        case ON_CLICK_SIGN:
            state = servantOnSign( state );
           break;
        case ON_CLICK_NUMBER:
            state = servantClickNumber( state, action );
            break;
        case ON_CLICK_SIMPLE_OPERATOR:
            state = servantSimpleOperator( state, action );
            break;
        case ON_CLICK_COMPLEXES:
            state = servantComplexes( state, action );
            break;
        case ON_CLICK_PERCENT:
            state = servantPercentOperator( state );
            break;
        default:

    }
    ///TODO: Перегнать графику в свг
    ///TODO: Заменить инклюдес
    ///TODO: Проверить взаимодействие с кнопкой backspace
    ///TODO: Деление на нуль. Добавить текст: Деление на ноль невозможно
    ///TODO: Оригинальный калькулятор имеет бОльшую высоту
    ///TODO: Кнопка закрыть активна и работает неправильно
    ///TODO: Активны кнопки М
    ///TODO: Реализовать поведение панели при использовании "сложных операторов" как на 2020-10-10_14-57-46 ( в папке doc )
    /////////////////////////////CONSOLE/////////////////////////////////////
        ///TODO: Console log in the code "INDEX_JS" line 32
        if( true ){
            console.group( 'Console log in the code "INDEX_JS" line 32' );
            //console.debug( 'state: ', state );
            //console.debug( '( !buffer%1 ): ', ( !( buffer%1 ) ) );
            console.table( state );
            console.table( action );
            //console.debug( 'this: ', this );
            console.groupEnd();
        }
    /////////////////////////////END CONSOLE/////////////////////////////////

    return  state;

}

