import {SIMPLE_PLUS} from "../constants";

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