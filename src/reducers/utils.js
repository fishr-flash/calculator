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
    ///FIXME: Replace includes to indexOf, and flat to toFlat
    if( log && log.includes( 'negate')){
        negates = `negate( ${ log } )`;
    } else {
        negates = `negate( ${ negates } )`;
    }
    return negates;
};

export const wrapperArg = ( nm, log, wrapText ) =>{

    let result = `${ nm }`;
    if( log && log.includes( wrapText )){
        result = `${wrapText}(${ log })`;
    } else {
        result = `${wrapText}(${ nm })`;
    }

    return result;
};

export const applyOneDivison = ( nm, log ) =>{

    let negates = nm;
    ///FIXME: Replace includes to indexOf, and flat to toFlat
    if( log && log.includes( 'negate')){
        negates = `negate( ${ log } )`;
    } else {
        negates = `negate( ${ negates } )`;
    }
    return negates;
};



