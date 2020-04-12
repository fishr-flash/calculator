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
import {getBuffer, getFirstNumber, getHistory, getResult, getSecondNumber} from "./utils";

// export default combineReducers({ setNumber });

const store = {
    buffer: 0
  , output: "0"
  , firstNumber: 0
  , secondNumber: 0
  , resultNumber: 0
  , firstOperator: null
  , secondOperator: null
  , onDot: false
  , history: ''



};
export default function reducer ( state = store, action ) {

    let buffer = getBuffer( state, action );

    switch ( action.type ) {


        case ON_CLICK_DOT:

            if( !( buffer%1 ) )
            state = {
                ...state
                , onDot: true
                , output : `${buffer},`
            };

            break;

        case ON_CLICK_SIGN:
            buffer*=-1;
            state = {
                ...state
                , buffer: buffer
                , output : `${buffer}`.replace(".", ",")
            };
           break;

        case ON_CLICK_NUMBER:
            const firstNumber = getFirstNumber( state, buffer );
            const secondNumber = getSecondNumber( state, buffer );

            state = {
                ...state
                , buffer : buffer
                , firstNumber: firstNumber
                , secondNumber: secondNumber
                , resultNumber: 0
                , onDot: false
                , output : `${buffer}`.replace(".", ",")

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
                    , firstNumber: state.secondNumber ? state.firstNumber: buffer
                    , secondNumber: state.secondNumber ? buffer: 0
                    , history: getHistory( )
                }
            } else if( action.value === SIMPLE_RESULT ){

                if( state.firstOperator ){
                    buffer = getResult( state );
                    state = {
                        ...state
                        , buffer: buffer
                        , firstNumber: buffer
                        ///TODO remove, secondNumber: buffer
                        ///TODO remove, firstOperator: null
                        , secondOperator: null
                        , output: `${buffer}`.replace(".", ",")
                        , history: getHistory( { ...state, history: ''}, SIMPLE_RESULT  )
                    }
                }

            } else if( !state.firstOperator ){
                state ={
                    ...state
                    , firstOperator: action.value
                    , history: getHistory( {...state, firstOperator: action.value }, ''  )
                }
            } else if( state.secondNumber ){
                buffer = getResult( state );

                state = {
                    ...state
                    , buffer: buffer
                    , firstNumber: buffer
                    , secondNumber: 0
                    , firstOperator: null
                    , secondOperator: null
                    , output: `${buffer}`.replace(".", ",")
                    , history: getHistory( {...state, firstOperator: action.value }, action.value  )
                }
            }
            ////FIXME: СЛОМАЛАСЬ ТОЧКА!
            ////FIXME: СЛОМАЛСЯ РЕМУВ!
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

