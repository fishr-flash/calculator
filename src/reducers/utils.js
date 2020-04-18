import {SIMPLE_PLUS, SIMPLE_RESULT} from "../constants";

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

export const toFloat = (displayText )=> parseFloat( displayText.replace( ",", "." ) );

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
};