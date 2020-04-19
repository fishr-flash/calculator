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

export const toFloat = (displayText )=> parseFloat( displayText.replace( ",", "." ).replace( ' ', '') );

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

export const formatDisplayText = ( dText )=>{
    /// it is impossible to get rid of a space in the input line :(
    let stringNm = dText.split( '' ).map( v =>{
         return v === "," ? "." :  isNaN( parseInt( v ) ) ? '' : v;
    }).join('');
    const parts = stringNm.split( "." );
    return `${ new Intl.NumberFormat('ru-RU').format(  parts[ 0 ] )}${parts.length > 1?","+parts[ 1 ]:''}`;

};