// import { combineReducers } from 'redux';
// import setNumber from "./setNumber";
import {
    MODES,
    ON_CLICK_DOT,
    ON_CLICK_NUMBER,
    ON_CLICK_SIGN,
    ON_CLICK_SIMPLE_OPERATOR, SIMPLE_PLUS,
    SIMPLE_REMOVE,
    SIMPLE_RESULT
} from "../constants";
import { getHistory, getOutput, getResult} from "./utils";

// export default combineReducers({ setNumber });

const store = {
     output: "0"
    , firstNumber: 0
    , lastNumber: 0
    , mode: MODES.BEGIN_MODE
    , firstOperator: null
    , onDot: false
    , history: ''



};
export default function reducer ( state = store, action ) {

    let {  output
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , history } = state;




    switch ( action.type ) {
        ///TODO: Разбить цифры на группы по 3 в окнах вывода

        case ON_CLICK_DOT:

            if( !state.output.includes( "," ) ){
                onDot = true;
                output = `${ state.output },`;
            }


            break;

        case ON_CLICK_SIGN:

            if( mode < MODES.FIRST_OPERATOR ){
                firstNumber *= -1;
                output = firstNumber;
            } else if( mode === MODES.FIRST_OPERATOR ) {
                mode = MODES.LAST_NUMBER;
                lastNumber = firstNumber * -1;
                output = lastNumber;
                history = getHistory( '', firstNumber, firstOperator, `negate( ${ Math.abs( lastNumber ) } )`, '', mode );

            } else {
                if( history.includes( "=" )){

                    firstNumber = 0;
                    lastNumber =  parseFloat( output );
                    firstOperator = SIMPLE_PLUS;
                    output = getResult( firstNumber, lastNumber, firstOperator ) * -1;
                    history = getHistory( `negate( ${ lastNumber } )`, '', '', '', '' )
                    onDot = store.onDot;
                    mode = MODES.AFTER_RESULT;
                    lastNumber *= -1;
                } else if( mode === MODES.LAST_NUMBER ) {

                    lastNumber *= -1;
                    output = lastNumber;

                    if( history.includes( 'negate')){

                        ///TODO: history text-align = right
                        const countNegates = history.split( 'negate').length;

                        let lastNegate = Math.abs( lastNumber );
                        for (let i = 0; i < countNegates ; i++) {
                            lastNegate = `negate( ${ lastNegate } )`;
                        }

                        history = getHistory( '', firstNumber, firstOperator, lastNegate, '', mode );
                    }

                    mode = MODES.AFTER_RESULT;
                } else {
                    lastNumber *= -1;
                    output = lastNumber;

                    if( history.includes( 'negate')){


                        const countNegates = history.split( 'negate').length;

                        let lastNegate = Math.abs( lastNumber );
                        for (let i = 0; i < countNegates ; i++) {
                            lastNegate = `negate( ${ lastNegate } )`;
                        }

                        history = getHistory( lastNegate, '', '', '', '', mode );
                    }

                }

            }


           break;
        case ON_CLICK_NUMBER:

            if( mode === MODES.AFTER_RESULT ){
                output = store.output;
                 firstNumber = store.firstNumber;
                 lastNumber = store.lastNumber;
                 mode = store.mode;
                 firstOperator = store.firstOperator;
                 onDot = store.onDot;
                 history = store.history;
            }

            if( mode === MODES.FIRST_OPERATOR ){
                output = getOutput( lastNumber.toString(), action.value, onDot );
                lastNumber = parseFloat( output );
                mode = MODES.LAST_NUMBER;

            } else if ( mode === MODES.LAST_NUMBER ){
                output = getOutput( output, action.value, onDot );
                lastNumber = parseFloat( output );
            } else {
                output = getOutput( output, action.value, onDot );
                firstNumber = parseFloat( output );
            }

            break;

        case ON_CLICK_SIMPLE_OPERATOR:

            onDot = false;
            ///TODO: Доделать!!!
            /*if( action.value === SIMPLE_REMOVE ){
                buffer = parseFloat( state.output.slice(0, -1 ).replace(",", ".") );
                if( isNaN( buffer ) )
                            buffer = 0;
                state = {
                    ...state
                    , buffer: buffer
                    , output: `${buffer}`.replace(".", ",")
                    , firstNumber: state.lastNumber ? state.firstNumber: buffer
                    , lastNumber: state.lastNumber ? buffer: 0
                    , history: getHistory( )
                    , onDot: false
                }
            } else */if( action.value === SIMPLE_RESULT && firstOperator ){
                if( firstOperator ){
                    if( !lastNumber && mode < MODES.LAST_NUMBER ){
                        lastNumber = parseFloat( output );
                        mode = MODES.LAST_NUMBER;
                    }
                    output = getResult( firstNumber, lastNumber, firstOperator );
                    history = getHistory( mode === MODES.AFTER_RESULT ? '': history
                                                , firstNumber
                                                , firstOperator
                                                , lastNumber
                                                , SIMPLE_RESULT
                                                , mode );
                    firstNumber = parseFloat( output );
                    mode = MODES.AFTER_RESULT;

                }


            } else if( mode < MODES.LAST_NUMBER &&  firstOperator ){
                history = getHistory( ''
                    , firstNumber
                    , firstOperator
                    , lastNumber
                    , ''
                    , mode);

                ///  over simple a butt
            } else if( !firstOperator ){
                firstOperator = action.value;
                mode = MODES.FIRST_OPERATOR;

                history = getHistory( ''
                                        , firstNumber
                                        , firstOperator
                                        , lastNumber
                                        , ''
                                        , mode);
            } else if( mode === MODES.LAST_NUMBER ){
                /// now, is exits from SIMPLE_RESULT
                if( history.includes( "=") ){

                    firstNumber = parseFloat( output );
                    firstOperator = action.value;
                    lastNumber = 0;
                    mode = MODES.FIRST_OPERATOR;
                    history = getHistory( ''
                                            , firstNumber
                                            , firstOperator
                                            , lastNumber
                                            , ''
                                            , mode);



                } else {
                    output = getResult( firstNumber, lastNumber, firstOperator );
                    firstNumber = parseFloat( output );
                    firstOperator = action.value;
                    history = getHistory( history
                                            , firstNumber
                                            , firstOperator
                                            , lastNumber
                                            , firstOperator
                                            , mode  );
                    lastNumber = 0;
                    mode = MODES.FIRST_OPERATOR;
                }



            }

            break;
        default:

    }

    state = {
        ...state
        , mode: mode
        , firstNumber: firstNumber
        , lastNumber: lastNumber
        , firstOperator: firstOperator
        , onDot: onDot
        , output: `${output}`.replace(".", ",")
        , history: history
    };
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

