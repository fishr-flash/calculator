import {SIMPLE_PLUS, SIMPLE_RESULT} from "../constants";

/**
 *
 * @param logText
 * @param firstNumber
 * @param firstOperator
 * @param lastNumber
 * @param lastSymbol
 * @returns {string}
 */
export const getLogText = (logText
                             , firstNumber
                             , firstOperator
                             , lastNumber
                             , lastSymbol ) =>{

    const first = `${firstNumber}`.replace(".", ",");
    const second = `${lastNumber}`.replace(".", ",") ;
    return `${ logText } ${first} ${ getSimpleOperator( firstOperator )} ${second} ${ getSimpleOperator( lastSymbol )}`;
};

export const getArrLogText = ( ...args ) =>{

    /////////////////////////////CONSOLE/////////////////////////////////////
        ///TODO: Console log in the code "UTILS_JS" line 26
        if( true ){
            console.group( 'Console log in the code "UTILS_JS" line 26' );
            console.info( 'args: ', args );
            console.info( 'this: ', this );
            //console.table( this );
            console.groupEnd();
        }
    /////////////////////////////END CONSOLE/////////////////////////////////
    return args.map( v => {
        let res ="";
        if( typeof v === "number" )
            res = v.toString().replace( ".", ",");
        else
            res = getSimpleOperator( v );

        if( res ) return res;
        return v;
    })
};

export const getSimpleOperator = (operator )=>{

    let o = '';
    switch ( operator ) {
        case SIMPLE_RESULT:
            o = "=";
            break;
        case SIMPLE_PLUS:
            o = "+";
            break;
        default:
            o = "";
    }

    return o;
};
export const getResult = (  firstNumber, lastNumber, firstOperator ) =>{

    let result = 0;
    switch ( firstOperator ) {

        case SIMPLE_PLUS:
            result = firstNumber + lastNumber;
            break;
        default:
    }

    return result.toString().replace( ".", ",");
};

export const getOutput = ( base, arg, dot ) =>{
    if( base.includes( "," )  ) {
        base = base.replace( ",", ".");
        dot = false;
    }
    if( dot )
        return  `${ base.toString() }.${ arg }`;
    else
        return  base === '0' ? `${ arg}` : `${base}${arg}`;
};

export const applyNegates = ( nm, log )=>{
    let negates = Math.abs( nm );

    if( log.includes( 'negate')){
        const countNegates = log.split( 'negate').length;
        for (let i = 1; i < countNegates ; i++) {
            negates = `negate( ${ negates } )`;
        }


    }
    return `negate( ${ negates } )`;
}