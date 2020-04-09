// import { combineReducers } from 'redux';
// import setNumber from "./setNumber";
import {ON_CLICK_DOT, ON_CLICK_NUMBER} from "../constants";
import {getBuffer, getFirstNumber, getOutput, getSecondNumber} from "./utils";

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
  , onSign: false


};
export default function reducer ( state = store, action ) {

    const buffer = getBuffer( state, action );

    switch ( action.type ) {

        case ON_CLICK_DOT:

            state = {
                ...state
                , onDot: true
                , output : `${buffer},`
            };

            break;
        case ON_CLICK_NUMBER:
            const firstNumber = getFirstNumber( state, action, buffer );
            const secondNumber = getSecondNumber( state, action, buffer );

            state = {
                ...state
                , buffer : buffer
                , firstNumber: firstNumber
                , secondNumber: secondNumber
                , resultNumber: 0
                , onDot: false
                , output : `${buffer}`
            };
            break;
        default:



    }


    
    /////////////////////////////CONSOLE/////////////////////////////////////
        ///TODO: Console log in the code "INDEX_JS" line 32
        if( true ){
            console.group( 'Console log in the code "INDEX_JS" line 32' );
            //console.debug( 'state: ', state );
            console.table( state );
            //console.debug( 'this: ', this );
            console.groupEnd();
        }
    /////////////////////////////END CONSOLE/////////////////////////////////

    return  state;

}

