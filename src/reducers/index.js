// import { combineReducers } from 'redux';
// import setNumber from "./setNumber";
import {
    ON_CLICK_DOT,
    ON_CLICK_NUMBER,
    ON_CLICK_SIGN,
    ON_CLICK_SIMPLE_OPERATOR,
    SIMPLE_REMOVE,
    SIMPLE_RESULT
} from "../constants";
import {getBuffer, getHistory, getOutput, getResult} from "./utils";

// export default combineReducers({ setNumber });

const store = {
    buffer: 0
    , output: "0"
    , firstNumber: 0
    , lastNumber: 0
    , mode: 0
    , firstOperator: null
    , onDot: false
    , history: ''



};
export default function reducer ( state = store, action ) {

    let buffer = getBuffer( state, action );
    let output = state.output;
    let firstNumber = state.firstNumber;
    let lastNumber = state.lastNumber;
    let mode = state.mode;

    switch ( action.type ) {


        case ON_CLICK_DOT:

            if( state.output.search( "," ) === -1 ){
                state = {
                    ...state
                    , onDot: true
                    , output : `${ state.output },`
                };
            }


            break;

        case ON_CLICK_SIGN:
            if( state.firstOperator ){
                if( lastNumber ){
                    lastNumber *= -1;
                    output = lastNumber < 0 ? `-${output}` : output.slice( 1 );
                }
            } else if( firstNumber ){
                firstNumber *= -1;
                output = firstNumber < 0 ? `-${output}` : output.slice( 1 );
            }

            state = {
                ...state
                , firstNumber:  firstNumber
                , lastNumber:  lastNumber
                , output : output
            };
           break;

        case ON_CLICK_NUMBER:

            if( mode === 1 ){
                output = getOutput( lastNumber.toString(), action.value, state.onDot );
                lastNumber = parseFloat( output );
                mode = 2;

            } else if ( mode === 2 ){
                output = getOutput( state.output, action.value, state.onDot );
                lastNumber = parseFloat( output );
            } else {
                output = getOutput( state.output, action.value, state.onDot );
                firstNumber = parseFloat( output );
            }


            state = {
                ...state
                , firstNumber: firstNumber
                , lastNumber: lastNumber
                , mode: mode
                , onDot: false
                , output : `${output}`.replace(".", ",")

            };


            break;

        case ON_CLICK_SIMPLE_OPERATOR:

            if( action.value === SIMPLE_REMOVE ){
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
                }
            } else if( action.value === SIMPLE_RESULT ){

                if( state.firstOperator ){

                    if( !lastNumber && mode !== 2 )
                                    lastNumber = firstNumber;

                    const output = getResult( state );

                    state = {
                        ...state
                        , firstNumber: output
                        , output: `${output}`.replace(".", ",")
                        , history: getHistory( { ...state, history: ''}, SIMPLE_RESULT  )
                    }
                }

            } else if( !state.firstOperator ){

                state ={
                    ...state
                    , firstOperator: action.value
                    , mode: 1
                    , onDot: false
                    , history: getHistory( { ...state,  history:'',  firstOperator: action.value }, '')
                }
            } else if( state.mode === 2 && lastNumber ){
                buffer = getResult( state );

                state = {
                    ...state
                    , buffer: buffer
                    , mode: 1
                    , firstNumber: buffer
                    , lastNumber: 0
                    , firstOperator: action.value
                    , output: `${buffer}`.replace(".", ",")
                    , history: getHistory( {...state, firstOperator: action.value }, action.value  )
                }
            }

            break;
        default:



    }

    /////////////////////////////CONSOLE/////////////////////////////////////
        ///TODO: Console log in the code "INDEX_JS" line 32
        if( true ){
            console.group( 'Console log in the code "INDEX_JS" line 32' );
            //console.debug( 'state: ', state );
            //console.debug( '( !buffer%1 ): ', ( !( buffer%1 ) ) );
            console.table( state );
            //console.debug( 'this: ', this );
            console.groupEnd();
        }
    /////////////////////////////END CONSOLE/////////////////////////////////

    return  state;

}

