import {SIMPLE_DIVISION, SIMPLE_MINUS, SIMPLE_MULTIPLY, SIMPLE_PLUS, SIMPLE_RESULT} from "../constants";

export const getArrLogText = ( ...args ) =>{

    let arr = args.flat( 10 ).map( v => {
        let res ="";
        if( typeof v === "number" )
            res = v.toString().replace( ".", ",");
        else
            res = getSimpleOperator( v );

        if( res ) return res;
        return v;
    });

    return arr.filter( v => v !== "" );
};
///TODO: Перестроить работу с перем. displayText, будет числом и только на выводе будет преобразовываться в текст
export const toFloat = (displayText )=> {
    const strNm = displayText.split( '' ).map( v =>{
        return v === "," ? "." :  isNaN( parseInt( v ) ) ? '' : v;
    }).join('');
    return parseFloat( strNm );
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
            result = ( firstNumber + lastNumber ).toFixed( 10 ) * 1 /* exclude excess zeros*/;
            break;

        case SIMPLE_MINUS:
            result = ( firstNumber - lastNumber ).toFixed( 10 ) * 1 /* exclude excess zeros*/;
            break;
        case SIMPLE_MULTIPLY:
            result = ( firstNumber * lastNumber ).toFixed( 10 ) * 1 /* exclude excess zeros*/;
            break;
        case SIMPLE_DIVISION:
            result = ( firstNumber / lastNumber ).toFixed( 10 ) * 1 /* exclude excess zeros*/;
            break;
        default:
    }

    return result.toString().replace( ".", ",");
};

export const getOutput = ( base, arg, dot ) =>{
    if( base.includes( "," )  ) {
        dot = false;
    }
    if( dot )
        return  `${ base.toString() },${ arg }`;
    else
        return  base === '0' ? `${ arg}` : `${base}${arg}`;
};

export const applyNegates = ( nm, log )=>{
    let negates = nm;

    if( log && log.includes( 'negate')){
        const countNegates = log.split( 'negate').length;
        for (let i = 1; i < countNegates ; i++) {
            negates = `negate( ${ negates } )`;
        }
    }
    return `negate( ${ negates } )`;
};

