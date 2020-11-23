import {
    MODES,
    NOT_OPERATOR,
    ON_CLICK_COMPLEXES,
    ON_CLICK_DOT,
    ON_CLICK_MAIN, ON_CLICK_MEMORY, ON_CLICK_MEMORY_ELEMENT, ON_CLICK_MEMORY_LIST,
    ON_CLICK_NUMBER,
    ON_CLICK_PERCENT,
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
import servantMemory from "./servants/servantMemory";
import servantMemoryList from "./servants/servantMemoryList";

// export default combineReducers({ setNumber });

export const store = {
     displayText: "100"
    , firstNumber: 0
    , lastNumber: 0
    , mode: MODES.BEGIN_MODE
    , firstOperator: NOT_OPERATOR
    , onDot: false
    , percentNumber: NaN
    , divisionByZeroBlocking: false
    , memoryListOnOpen: true
    , arrMemory: [ 123, 10, 32, 1234564897987546 ]
    , arrLogText: []
    , numberIsWrapped: false

};

export default function reducer ( state = store, action ) {

    if ( state.divisionByZeroBlocking ) state = { ...store };

    // значение divisionByZeroBlocking устанавливается только в servantResult, по нему
    // ориентируются только веб элементы меняя состояние disabled, нажатие любой активной
    // кнопки меняет состояние divisionByZeroBlocking на false, никакие servant'ы, кроме
    // servantResult, не используют его значение, поэтому в них не передается
    state.divisionByZeroBlocking = false;

    switch ( action.type ) {
        case ON_CLICK_RESULT:
            state = servantResult( state );
            break;
        case ON_CLICK_MAIN:
            state = servantMain( state, action );
            break;
        case ON_CLICK_DOT:
            state = servantOnDot( state );
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
        case ON_CLICK_MEMORY:
            state = servantMemory( state, action  );
            break;

        case ON_CLICK_MEMORY_LIST:
        case ON_CLICK_MEMORY_ELEMENT:
            state = servantMemoryList( state, action  );
            break;
        default:

    }

    ///TODO: Урезать кол-во параметров передаваемых в серванты, ограничив используемыми
    ///TODO: Добавить экспоненциальный вывод после некоторого кол-ва разрядов 123456789013456+1234567890123456...
    ///TODO: Добавить propTypes
    ///FIXME: в мемори лист есть разделитель чисел
    /////////////////////////////CONSOLE/////////////////////////////////////
        ///TODO: Console log in the code "INDEX_JS" line 32
        if( process && process.env.NODE_ENV === 'development' ){
            console.group( 'Console log in the code "INDEX_JS" line 32' );
            //console.debug( 'state: ', state );
            //console.debug( '( !buffer%1 ): ', ( !( buffer%1 ) ) );
            console.table( state );
            console.table( action );
            console.info( 'process.env.NODE_ENV: ', process.env.NODE_ENV );
            //console.debug( 'this: ', this );
            console.groupEnd();
        }
    /////////////////////////////END CONSOLE/////////////////////////////////

    return  state;

}

