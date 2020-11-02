import {
    COMPLEXES_DIVISION_X, COMPLEXES_SQR_X, COMPLEXES_SQRT_X,
    SIMPLE_DIVISION,
    SIMPLE_MINUS,
    SIMPLE_MULTIPLY,
    SIMPLE_PLUS,
    SIMPLE_RESULT
} from "../constants";

export const getArrLogText = ( ...args ) =>{

    let arr = flatDeep( args ).map( v => {
        let res ="";
        if( typeof v === "number" || wasWrapped( v ) )
            res = toDisplayText( v );
        else
            res = getSimpleOperator( v );
        if( res ) return res;
        return v;
    });

    return arr.filter( v => v !== "" );
};

export const toFloat = (displayText )=> {
    return roundNum( parseFloat(  displayText.replace( ",", '.')) );
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
 * Prepares a number for output in the main current number field
 *
 * @param base - perhaps the first part of the number ( before the separator )
 * @param arg - enter digit
 * @param dot - separator flag
 * @returns {string} the result is in string format
 */
export const getOutput = ( base, arg, dot = false ) =>{
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
 * @param expression a string expression (ex 'negate( xx )' ) or a number
  * @param wrapText
 * @returns {string}
 */
export const wrapperArg = ( expression, wrapText ) => `${wrapText}( ${ toDisplayText( expression ).trim() } )`;

export const flatDeep = ( arr, d = Infinity )=>{
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
};

/**
 *
 * @param argWrap commonly arrLogText[ 0 ]
 * @param verificationNumber
 * @returns {*} String
 */
export const argumentOfWrap =  (argWrap, verificationNumber ) => wasWrapped( argWrap ) ? argWrap : toDisplayText( verificationNumber );


/**
 * Анализирует последнюю ячейку массива лога, если кол-во ячеек нечетное,
 * то в последней ячейке содержится либо число, либо "обернутое" выражение,
 * тогда она извлекается из массива, оборачивается в требуемое выражение
 * и затем включается в последовательность лога. Иначе, если последняя часть
 * массива лога - оператор ( +, -... ), в последовательность лога включается
 * сообщенный второй аргумент, чаще всего это число из переменной firstNumber или
 * lastNumber
 *
 * @param arrLog
 * @param nm
 * @param wrapText
 */
export const updateArrLogText = ( arrLog, nm, wrapText )=>{

    let firstArgument = '';
    let secondArgument = '';

    if( arrLog.length > 1 && arrLog.length%2 ){
        firstArgument = arrLog.slice( 0, -1 );
        secondArgument = wrapperArg( arrLog.pop(), wrapText );
    } else {
        firstArgument = arrLog;
        secondArgument = wrapperArg( toDisplayText( nm ), wrapText );
    }

    return getArrLogText( firstArgument, secondArgument );

};


/**
 *
 * @param typeOperation
 * @returns {{cOperation: (function(*): number), wrapText: string}}
 */
export const getComplexesAttributes = (typeOperation )=>{
    let attributes = {};

    switch ( typeOperation ) {
        case COMPLEXES_DIVISION_X:
            ///FIXME: а если имя функции указать строковым значением изменит ли это тип функции с [ Function cOperation ]?
            attributes = { cOperation: ( val )=> 1/val, wrapText: '1/' };
            break;
        case COMPLEXES_SQR_X:
            attributes = { cOperation: ( val )=> Math.pow( val, 2 ), wrapText: 'sqr' };
            break;
        case COMPLEXES_SQRT_X:
            attributes = { cOperation: ( val )=> Math.sqrt( val ), wrapText: '√' };
            break;
        default:
            throw Error( 'Unknown typeOperation received');
    }

    return attributes;


};

export const wasWrapped = ( expression )=>{
    const operators = [ '+'
                        , '-'
                        , '×'
                        , '÷'
                        , '='
                        , 'simpleMinus'
                        , 'simplePlus'
                        , 'simpleMultiply'
                        , 'simpleDivision'
                        , 'simpleResult'
                        ];
    return expression !== undefined && isNaN( expression ) && operators.indexOf( expression ) === - 1;
};
