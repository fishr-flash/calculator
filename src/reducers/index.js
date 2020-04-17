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
import {applyNegates, getLogText, getOutput, getResult} from "./utils";

// export default combineReducers({ setNumber });

const store = {
     displayText: "0"
    , firstNumber: 0
    , lastNumber: 0
    , mode: MODES.BEGIN_MODE
    , firstOperator: null
    , onDot: false
    , logText: ''



};
export default function reducer ( state = store, action ) {

    let {  displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , logText } = state;



    switch ( action.type ) {
        ///TODO: Разбить цифры на группы по 3 в окнах вывода
            ///FIXME: 123+321=(444)-|+, -|+, +....

        case ON_CLICK_DOT:

            if( !state.displayText.includes( "," ) ){
                onDot = true;
                displayText = `${ state.displayText },`;
            }


            break;

        case ON_CLICK_SIGN:

            if( mode < MODES.FIRST_OPERATOR ){
                firstNumber *= -1;
                displayText = firstNumber;
            } else if( mode === MODES.FIRST_OPERATOR ) {
                mode = MODES.LAST_NUMBER;
                lastNumber = firstNumber * -1;
                displayText = lastNumber;
                logText = getLogText( '', firstNumber, firstOperator, `negate( ${ Math.abs( lastNumber ) } )`, '' );

            } else {
                if( mode === MODES.AFTER_RESULT ){
                    firstNumber = parseFloat( displayText.replace( ",", "." ) ) * -1;
                    displayText = firstNumber;
                    logText = getLogText( ` ${ applyNegates( firstNumber, logText ) } `, '', '', '', '' );

                } else if( mode === MODES.LAST_NUMBER ) {

                    lastNumber *= -1;
                    displayText = lastNumber;

                    ///TODO: logText text-align = right
                    logText = getLogText( '', firstNumber, firstOperator,  `${ applyNegates( lastNumber, logText ) } `, '' );
                } else {
                    lastNumber *= -1;
                    displayText = lastNumber;

                    if( logText.includes( 'negate')){


                        const countNegates = logText.split( 'negate').length;

                        let lastNegate = Math.abs( lastNumber );
                        for (let i = 0; i < countNegates ; i++) {
                            lastNegate = `negate( ${ lastNegate } )`;
                        }

                        logText = getLogText( lastNegate, '', '', '', '' );
                    }

                }

            }


           break;
        case ON_CLICK_NUMBER:

            if( mode === MODES.AFTER_RESULT ){
                displayText = store.displayText;
                 firstNumber = store.firstNumber;
                 lastNumber = store.lastNumber;
                 mode = store.mode;
                 firstOperator = store.firstOperator;
                 onDot = store.onDot;
                 logText = store.logText;
            }

            if( mode === MODES.FIRST_OPERATOR || mode === MODES.MULTIPLE_ACTION ){
                displayText = getOutput( lastNumber.toString(), action.value, onDot );
                lastNumber = parseFloat( displayText.replace( ",", "." ) );
                mode = MODES.LAST_NUMBER;

            } else if ( mode === MODES.LAST_NUMBER ){
                displayText = getOutput( displayText, action.value, onDot );
                lastNumber = parseFloat( displayText.replace( ",", "." ) );
            } else {
                displayText = getOutput( displayText, action.value, onDot );
                firstNumber = parseFloat( displayText.replace( ",", "." ) );
            }

            break;

        case ON_CLICK_SIMPLE_OPERATOR:

            ///FIXME: , = 3 = ( 0=3= )...


            onDot = false;
            if( action.value === SIMPLE_REMOVE ){

                if( displayText !== "0" ){
                    if( mode < MODES.AFTER_RESULT ){
                        displayText = displayText.slice( 0, -1 ) || "0";

                        if( mode < MODES.LAST_NUMBER )
                            firstNumber = parseFloat( displayText.replace( ",", "." ) );
                        else
                            lastNumber =  parseFloat( displayText.replace( ",", "." ) );
                    }else {
                        firstNumber = parseFloat( displayText.replace( ",", "." ) );
                         logText ="";
                    }
                }
            }
            else if( action.value === SIMPLE_RESULT ){
                   if( mode >= MODES.FIRST_OPERATOR ){

                       if( ( !lastNumber && mode < MODES.LAST_NUMBER ) || mode === MODES.MULTIPLE_ACTION ){
                           lastNumber = parseFloat( displayText.replace( ",", "." ) );
                           mode = MODES.LAST_NUMBER;
                       }
                       displayText = getResult( firstNumber, lastNumber, firstOperator );
                       if( mode === MODES.AFTER_RESULT ){

                           logText = getLogText( ''
                               , firstNumber
                               , firstOperator
                               , lastNumber
                               , SIMPLE_RESULT );
                       }
                       else{
                           logText = getLogText( logText
                               , ''
                               , ''
                               , logText.includes( 'negate') ? '' : lastNumber
                               , SIMPLE_RESULT);
                       }

                       firstNumber = parseFloat( displayText.replace( ",", "." ) );
                       mode = MODES.AFTER_RESULT;
                   }
            } else {


                ////////////////// ANOTHER SIMPLE OPERATORS //////////////////////////

                onDot = false;
                if( mode === MODES.BEGIN_MODE
                    || mode === MODES.AFTER_RESULT
                    || mode === MODES.FIRST_OPERATOR ){
                    logText = getLogText( ''
                                        , firstNumber
                                        , action.value
                                        , ''
                                        , '' );

                    mode = MODES.FIRST_OPERATOR;
                } else if(  mode === MODES.MULTIPLE_ACTION ){
                    ///nothing

                } else {
                    displayText = getResult( firstNumber, lastNumber, firstOperator );
                    firstNumber = parseFloat( displayText.replace( ",", "." ) );

                    if( mode === MODES.LAST_NUMBER ){

                        logText = getLogText( logText
                                                , ''
                                                , ''
                                                , lastNumber
                                                , action.value);

                        mode = MODES.MULTIPLE_ACTION;
                    } else{
                        logText = getLogText( logText
                            , firstNumber
                            , action.value
                            , lastNumber
                            , action.value );
                        mode = MODES.FIRST_OPERATOR;
                    }

                }


                firstOperator = action.value;
                lastNumber = 0;

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
        , displayText: `${displayText}`.replace(".", ",")
        , logText: logText
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

