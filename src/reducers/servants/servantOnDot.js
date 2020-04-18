export default ({displayText
                    , firstNumber
                    , lastNumber
                    , mode
                    , firstOperator
                    , onDot
                    , arrLogText
                }, { type, value /*action*/})=>{

    if( !displayText.includes( "," ) ){
        onDot = true;
        displayText = `${ displayText },`;
    }


    return{ displayText: `${displayText}`.replace(".", ",")
        , firstNumber
        , lastNumber
        , mode
        , firstOperator
        , onDot
        , arrLogText
    };

}