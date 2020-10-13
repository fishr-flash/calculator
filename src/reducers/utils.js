import {SIMPLE_DIVISION, SIMPLE_MINUS, SIMPLE_MULTIPLY, SIMPLE_PLUS, SIMPLE_RESULT} from "../constants";

export const getArrLogText = ( ...args ) =>{

    let arr = flatDeep( args ).map( v => {
        let res ="";
        if( typeof v === "number" )
            res = toDisplayText( v );
        else
            res = getSimpleOperator( v );
        if( res ) return res;
        return v;
    });

    return arr.filter( v => v !== "" );
};

export const toFloat = (displayText )=> {
    return parseFloat(  displayText.replace( ",", '.'));
};

export const toDisplayText = ( nm )=>{

    return nm.toString().replace( ".", ",");
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

        case SIMPLE_MINUS:
            o = "-";
            break;
        case SIMPLE_MULTIPLY:
            o = "×";
            break;
        case SIMPLE_DIVISION:
            o = "÷";
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
            result = roundNum( firstNumber + lastNumber );
            break;

        case SIMPLE_MINUS:
            result = roundNum( firstNumber - lastNumber );
            break;
        case SIMPLE_MULTIPLY:
            result = roundNum( firstNumber * lastNumber );
            break;
        case SIMPLE_DIVISION:
            result = roundNum( firstNumber / lastNumber );
            break;
        default:
    }

    return result.toString().replace( ".", ",");
};

export const roundNum = (nm )=>{
    return nm.toFixed( 17 ) * 1 /* exclude excess zeros*/;
};
/**
 * Prepares a number for output in the current number field
 *
 * @param base - perhaps the first part of the number ( before the separator )
 * @param arg - enter digit
 * @param dot - separator flag
 * @returns {string} the result is in string format
 */
export const getOutput = ( base, arg, dot ) =>{
    if( base.includes( "," )  ) {
        dot = false;
    }
    if( dot )
        return  `${ base.toString() },${ arg }`;
    else
        return  base === '0' ? `${ arg}` : `${base}${arg}`;
};


/**
 *  Called when it is necessary to wrap a number in the text
 *  of the calculator log in any special text structure,
 *  such "wrapping" can be multiple
 *
 *  Вызывается при необходимости обернуть число в тексте лога
 *  калькулятора в какую либо специальную текстовую контструкцию,
 *  такое "обертывание" может быть множественным
 * @param nm
 * @param log
 * @param wrapText
 * @returns {string}
 */
export const wrapperArg = ( nm, log, wrapText ) =>{

    let result = `${ nm }`;
    if( log && log.includes( wrapText )){
        result = `${wrapText}( ${ log } )`;
    } else {
        result = `${wrapText}( ${ nm } )`;
    }

    return result;
};

export const flatDeep = ( arr, d = Infinity )=>{
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
};

/**
 *  analyzes the presence of a wrapped number
 *  and looks for a match with the firstNumber
 *
 * @param firstNumber
 * @param arrLogText - arrLogText[ 0 ]
 * @returns String
 */
export const firstArgument = ( firstNumber, arrLogText ) =>{
    if( isNaN( toFloat( arrLogText ) )
        && arrLogText.includes( toDisplayText( Math.abs( firstNumber ) )))
        return arrLogText;

    return toDisplayText( firstNumber );

};




