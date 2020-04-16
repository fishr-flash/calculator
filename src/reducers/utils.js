import {MODES, SIMPLE_PLUS, SIMPLE_RESULT} from "../constants";

/**
 *
 * @param logText
 * @param firstNumber
 * @param firstOperator
 * @param lastNumber
 * @param lastSymbol
 * @param mode
 * @returns {string}
*/
export const getLogText = (logText
                             , firstNumber
                             , firstOperator
                             , lastNumber
                             , lastSymbol
                             , mode ) =>{

    const first = logText ? '' :`${firstNumber}`.replace(".", ",");
    const second = mode >= MODES.MULTIPLE_ACTION && !logText.includes( 'negate' ) ?`${lastNumber}`.replace(".", ",") : '';
    return `${ logText } ${first} ${ logText ?'':getSimpleOperator( firstOperator )} ${second} ${ getSimpleOperator( lastSymbol )}`;
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