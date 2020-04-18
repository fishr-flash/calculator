// import { combineReducers } from 'redux';
// import setNumber from "./setNumber";
import {
    MODES,
    ON_CLICK_DOT,
    ON_CLICK_NUMBER,
    ON_CLICK_SIGN,
    ON_CLICK_SIMPLE_OPERATOR,
    SIMPLE_REMOVE,
    SIMPLE_RESULT
} from "../constants";
import {applyNegates, getArrLogText, getOutput, getResult, changeToFloat } from "./utils";

// export default combineReducers({ setNumber });

const store = {
     displayText: "0"
    , firstNumber: 0
    , lastNumber: 0
    , mode: MODES.BEGIN_MODE
    , firstOperator: null
    , onDot: false
    , arrLogText: []

};
export default function reducer ( state = store, action ) {

    let {  displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText} = state;



    switch ( action.type ) {
        ///TODO: Разбить цифры на группы по 3 в окнах вывода
        ///TODO: Огругление в JS ( 3,23 + 2,365 =5,59500000000 )
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
                arrLogText = getArrLogText( '', firstNumber, firstOperator, `negate( ${ Math.abs( lastNumber ) } )`, '' );
            } else {
                if( mode === MODES.AFTER_RESULT ){
                    firstNumber = changeToFloat( displayText ) * -1;
                    displayText = firstNumber;
                    arrLogText = getArrLogText( ` ${ applyNegates( firstNumber, arrLogText.join( " " ) ) } `, '', '', '', '' );

                } else if( mode === MODES.LAST_NUMBER ) {

                    lastNumber *= -1;
                    displayText = lastNumber;

                    ///TODO: arrLogText.join( " " ) text-align = right
                    arrLogText = getArrLogText( '', firstNumber, firstOperator,  `${ applyNegates( lastNumber, arrLogText.join( " " ) ) } `, '' );

                } else {
                    lastNumber *= -1;
                    displayText = lastNumber;

                    if( arrLogText.join( " " ).includes( 'negate')){


                        const countNegates = arrLogText.join( " " ).split( 'negate').length;

                        let lastNegate = Math.abs( lastNumber );
                        for (let i = 0; i < countNegates ; i++) {
                            lastNegate = `negate( ${ lastNegate } )`;
                        }

                        arrLogText = getArrLogText( lastNegate, '', '', '', '' );
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

            }

            if( mode === MODES.FIRST_OPERATOR || mode === MODES.MULTIPLE_ACTION ){
                displayText = getOutput( lastNumber.toString(), action.value, onDot );
                lastNumber = changeToFloat( displayText );
                mode = MODES.LAST_NUMBER;

            } else if ( mode === MODES.LAST_NUMBER ){
                displayText = getOutput( displayText, action.value, onDot );
                lastNumber = changeToFloat( displayText );
            } else {
                displayText = getOutput( displayText, action.value, onDot );
                firstNumber = changeToFloat( displayText );
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
                            firstNumber = changeToFloat( displayText );
                        else
                            lastNumber =  changeToFloat( displayText );
                    }else {
                        firstNumber = changeToFloat( displayText );
                        arrLogText = [];
                    }
                }
            }
            else if( action.value === SIMPLE_RESULT ){
                   if( mode >= MODES.FIRST_OPERATOR ){

                       if( ( !lastNumber && mode < MODES.LAST_NUMBER ) || mode === MODES.MULTIPLE_ACTION ){
                           lastNumber = changeToFloat( displayText );
                           mode = MODES.LAST_NUMBER;
                       }
                       displayText = getResult( firstNumber, lastNumber, firstOperator );
                       if( mode === MODES.AFTER_RESULT ){

                           arrLogText = getArrLogText( ''
                               , firstNumber
                               , firstOperator
                               , lastNumber
                               , SIMPLE_RESULT );
                       }
                       else{
                           arrLogText = getArrLogText( arrLogText
                               , ''
                               , ''
                               , arrLogText.join( " " ).includes( 'negate') ? '' : lastNumber
                               , SIMPLE_RESULT);
                       }

                       firstNumber = changeToFloat( displayText );

                   } else {
                         arrLogText = getArrLogText( firstNumber, SIMPLE_RESULT );
                         ///FIXME: multi negate
                   }

                    mode = MODES.AFTER_RESULT;

            } else {


                ////////////////// ANOTHER SIMPLE OPERATORS //////////////////////////

                onDot = false;
                if( mode === MODES.BEGIN_MODE
                    || mode === MODES.AFTER_RESULT
                    || mode === MODES.FIRST_OPERATOR ){
                    arrLogText = getArrLogText( ''
                        , firstNumber
                        , action.value
                        , ''
                        , '' );
                    mode = MODES.FIRST_OPERATOR;
                } else if(  mode === MODES.MULTIPLE_ACTION ){
                    ///nothing

                } else {
                    displayText = getResult( firstNumber, lastNumber, firstOperator );
                    firstNumber = changeToFloat( displayText );

                    if( mode === MODES.LAST_NUMBER ){

                        arrLogText = getArrLogText( arrLogText
                            , ''
                            , ''
                            , lastNumber
                            , action.value);

                        mode = MODES.MULTIPLE_ACTION;
                    } else{
                        arrLogText = getArrLogText( arrLogText
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
        , arrLogText: arrLogText
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

