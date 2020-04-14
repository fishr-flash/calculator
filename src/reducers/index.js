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
     output: "0"
    , firstNumber: 0
    , lastNumber: 0
    , mode: 0
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

        ///TODO: Доделать!!!
        /*case ON_CLICK_DOT:

            if( !state.output.includes( "," )  ){
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
*/
        case ON_CLICK_NUMBER:

            if( history.includes( "=" )){
                output = store.output;
                 firstNumber = store.firstNumber;
                 lastNumber = store.lastNumber;
                 mode = store.mode;
                 firstOperator = store.firstOperator;
                 onDot = store.onDot;
                 history = store.history;
            }

            if( mode === 1 ){
                output = getOutput( lastNumber.toString(), action.value, onDot );
                lastNumber = parseFloat( output );
                mode = 2;

            } else if ( mode === 2 ){
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
            } else */if( action.value === SIMPLE_RESULT ){
            ///FIXME: 1+2=( 3 )+ 2 + ( 5 ) = ( 10 )??
                if( firstOperator ){

                    ///TODO: on comment
                    if( !lastNumber && mode !== 2 ){
                        lastNumber = parseFloat( output );
                        mode = 2;
                    }



                    output = getResult( firstNumber, lastNumber, firstOperator );
                    history = getHistory( history.includes( '=') ? '': history
                                                , firstNumber
                                                , firstOperator
                                                , lastNumber
                                                , SIMPLE_RESULT
                                                , mode );
                    firstNumber = parseFloat( output );

                }


            } else if( mode !==2 &&  firstOperator ){
                history = getHistory( ''
                    , firstNumber
                    , firstOperator
                    , lastNumber
                    , ''
                    , mode);

                ///  over simple a butt
            } else if( !firstOperator ){
                firstOperator = action.value;
                mode = 1;

                history = getHistory( ''
                                        , firstNumber
                                        , firstOperator
                                        , lastNumber
                                        , ''
                                        , mode);
            } else if( mode === 2 ){
                /// now, is exits from SIMPLE_RESULT
                if( history.includes( "=") ){

                    firstNumber = parseFloat( output );
                    firstOperator = action.value;
                    lastNumber = 0;
                    mode = 1;
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
                    mode = 1;
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

