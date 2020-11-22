import {MEMORY_LIST_ON_CLOSE} from "../../constants";

export default ( state, action, )=>{

    let {displayText
        , firstNumber
        , lastNumber
        , mode
        , arrMemory
        , arrLogText
        , numberIsWrapped
        , memoryListOnOpen
    } = state;

    const { value } = action;


    /////////////////////////////CONSOLE/////////////////////////////////////
        ///TODO: Console log in the code "SERVANT_MEMORY_LIST_JS" line 17
        if( process && process.env.NODE_ENV === 'development' ){
            console.group( 'Console log in the code "SERVANT_MEMORY_LIST_JS" line 17' );
            console.info( 'value: ', value );
            console.info( 'this: ', this );
            //console.table( this );
            console.groupEnd();
        }
    /////////////////////////////END CONSOLE/////////////////////////////////
    if( value === MEMORY_LIST_ON_CLOSE ){
        memoryListOnOpen = false;
    }

    return{ ...state
        ,displayText
        , firstNumber
        , lastNumber
        , mode
        , arrMemory
        , arrLogText
        , numberIsWrapped
        , memoryListOnOpen
    };

}