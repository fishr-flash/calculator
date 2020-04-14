import {SIMPLE_PLUS, SIMPLE_RESULT} from "../constants";

export const getBuffer = ( {
    firstNumber
    , buffer
    , onDot
    , firstOperator
    , secondNumber
                           }, { value }) => {
    let newBuffer = buffer;
    if( firstNumber && firstOperator && !( secondNumber ) )
        newBuffer = 0;

        return parseFloat(`${ newBuffer}${ onDot ? ",":"" }${value}`);
};



/**
 *
 * @param history
 * @param firstNumber
 * @param firstOperator
 * @param lastNumber
 * @param lastSymbol
 * @param mode
 * @returns {string}
 */
export const getHistory = (  history
                             ,  firstNumber
                             , firstOperator
                             ,  lastNumber
                             , lastSymbol
                             , mode ) =>{

    const first = history ? '' :`${firstNumber}`.replace(".", ",");
    const second = mode === 2 ?`${lastNumber}`.replace(".", ",") : '';
    //const second = `${lastNumber}`.replace(".", ",");
    //const second = "2";
    return `${ history } ${first} ${ history ?'':getSimpleOperator( firstOperator )} ${second} ${ getSimpleOperator( lastSymbol )}`;
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

    return result;
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