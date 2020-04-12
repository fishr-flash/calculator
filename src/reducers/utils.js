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


export const getFirstNumber = ({ firstNumber, resultNumber, secondNumber, firstOperator }, buffer) => {
    let first = firstNumber;

    if (resultNumber) {
        first = resultNumber;
    } else if( !secondNumber && !firstOperator ){
        first = buffer;
    }
    return first;
};

export const getSecondNumber = ({ firstNumber, resultNumber, secondNumber, firstOperator }, buffer  ) => {
    let second = secondNumber;
    if( firstNumber && firstOperator ){
        second = buffer;
    } else if ( resultNumber){
        second = 0;
    }


    return second;
};


export const getHistory = ( { history,  firstNumber, firstOperator,  secondNumber }, lastSymbol ) =>{

    const first = history ? '' :`${firstNumber}`.replace(".", ",");
    const second =  secondNumber ?`${secondNumber}`.replace(".", ",") : '';
    return `${ history }${first} ${ history ? '' : getOperator( firstOperator ) } 
            ${second} ${ getOperator( lastSymbol )}`;
};

const getOperator = ( firstOperator )=>{

    let operator = ''
    switch ( firstOperator ) {
        case SIMPLE_RESULT:
            operator = "="
            break;
        case SIMPLE_PLUS:
            operator = "+";
            break;
        default:
            operator = "";
    }

    return operator;
};
export const getResult = ( { firstNumber, secondNumber, firstOperator}) =>{

    let result = 0;
    switch ( firstOperator ) {

        case SIMPLE_PLUS:
            result = firstNumber + secondNumber;
            break;
        default:
    }

    return result;
};