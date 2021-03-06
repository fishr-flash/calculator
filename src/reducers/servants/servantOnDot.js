import {MODES} from "../../constants";
import {store} from "../index";

export default ( state )=>{

    let {displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
        , percentNumber
    } = state;

    if( mode === MODES.AFTER_RESULT ){
        displayText = store.displayText;
        firstNumber = store.firstNumber;
        lastNumber = store.lastNumber;
        mode = store.mode;
        firstOperator = store.firstOperator;
        onDot = store.onDot;
        arrLogText = store.arrLogText;
        percentNumber = store.percentNumber;

    }else if( mode === MODES.FIRST_OPERATOR || mode === MODES.MULTIPLE_ACTION ){
        lastNumber = 0;
        displayText = '0';
        mode = MODES.LAST_NUMBER;
    }

    if( !displayText.includes( "," ) ){
        onDot = true;
        displayText = `${ displayText },`;
    }


    return{ ...state
        , displayText
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
        , percentNumber
    };

}