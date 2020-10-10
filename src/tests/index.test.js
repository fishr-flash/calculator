import servantResult from "../reducers/servants/servantResult";
import {MODES, ON_CLICK_SIGN, SIMPLE_PLUS} from "../constants";
import {flatDeep, wrapperArg} from "../reducers/utils";
import servantOnSign from "../reducers/servants/servantOnSign";

describe( "trial check jest on example check work servantResult method ", ()=>{

    test( "trial check servantResult", ()=>{

        const inData = { displayText:"321"
            , firstNumber: 123
            , lastNumber: 321
            , mode: MODES.LAST_NUMBER
            , firstOperator: SIMPLE_PLUS
            , onDot: false
            , arrLogText: [ "123", "+" ]};
        const sr = servantResult;

        const outData = {
            displayText: "444"
            , firstNumber: 444
            , lastNumber: 321
            , mode: MODES.AFTER_RESULT
            , firstOperator: SIMPLE_PLUS
            , onDot: false
            , arrLogText: [ "123", "+", "321", "=" ]
        };

        expect( sr( inData )).toStrictEqual( outData );

    });

    test( "check work the flatDeep function ( substitute the Array.prototype.flat function js )", () =>{

        const inData = [1, 2, [3, 4, [5, 6]]];
        expect( flatDeep( inData )).toStrictEqual(  [1, 2, 3, 4, 5, 6] );
    });

    test( "check the polyfill function flatDeep of MDN base ", ()=>{
        ///https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
        const arr = [1, 2, [3, 4, [5, 6]]];

        // to enable deep level flatten use recursion with reduce and concat
        function flatDeep(arr, d = 1) {
            return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice();
        };

        expect(  flatDeep(arr, Infinity) ).toStrictEqual(  [1, 2, 3, 4, 5, 6] );
        // [1, 2, 3, 4, 5, 6]
    });


});

describe( "trial many incoming data of servantResult ", ()=>{

    test( "trial many incoming data of servantResult", ()=>{

        const checkedData = [
            { /// обычное сравнение
                inData:{ displayText:"321"
                    , firstNumber: 123
                    , lastNumber: 321
                    , mode: MODES.LAST_NUMBER
                    , firstOperator: SIMPLE_PLUS
                    , onDot: false
                    , arrLogText: [ "123", "+" ]}
                , outData:{
                    displayText: "444"
                    , firstNumber: 444
                    , lastNumber: 321
                    , mode: MODES.AFTER_RESULT
                    , firstOperator: SIMPLE_PLUS
                    , onDot: false
                    , arrLogText: [ "123", "+", "321", "=" ]
                }
            }
            , {
                inData:{ displayText:"321"
                    , firstNumber: 123
                    , lastNumber: 321
                    , mode: MODES.LAST_NUMBER
                    , firstOperator: SIMPLE_PLUS
                    , onDot: false
                    , arrLogText: [ "123", "+" ]}
                , outData:{
                    displayText: "444"
                    , firstNumber: 444
                    , lastNumber: 321
                    , mode: MODES.AFTER_RESULT
                    , firstOperator: SIMPLE_PLUS
                    , onDot: false
                    , arrLogText: [ "123", "+", "321", "=" ]
                }
            }, {
                inData:{ displayText:"321"
                    , firstNumber: 123
                    , lastNumber: 321
                    , mode: MODES.LAST_NUMBER
                    , firstOperator: SIMPLE_PLUS
                    , onDot: false
                    , arrLogText: [ "123", "+" ]}
                , outData:{
                    displayText: "444"
                    , firstNumber: 444
                    , lastNumber: 321
                    , mode: MODES.AFTER_RESULT
                    , firstOperator: SIMPLE_PLUS
                    , onDot: false
                    , arrLogText: [ "123", "+", "321", "=" ]
                }
            }
        ];

        checkedData.forEach(( v, i ) =>{
           expect( servantResult( v.inData )).toStrictEqual( v.outData );
        });
    });
});


describe( "check work of servantOnSign ", ()=>{

    test( "test of servantOnSign", ()=> {

        const checkedData = [
            {
                inData:{ displayText:""
                    , firstNumber: 0
                    , lastNumber: 0
                    , mode: MODES.BEGIN_MODE
                    , firstOperator: null
                    , onDot: false
                    , arrLogText: []}
                , outData:{
                    displayText: "0"
                    , firstNumber: -0
                    , lastNumber: 0
                    , mode: MODES.BEGIN_MODE
                    , firstOperator: null
                    , onDot: false
                    , arrLogText: []
                }
            }
            , {
                inData:{ displayText:""
                    , firstNumber: 2
                    , lastNumber: 0
                    , mode: MODES.BEGIN_MODE
                    , firstOperator: null
                    , onDot: false
                    , arrLogText: []}
                , outData:{
                    displayText: "-2"
                    , firstNumber: -2
                    , lastNumber: 0
                    , mode: MODES.BEGIN_MODE
                    , firstOperator: null
                    , onDot: false
                    , arrLogText: []
                }
            }

            ];

        checkedData.forEach(( v, i ) =>{
            try{
                expect( servantOnSign( v.inData )).toStrictEqual( v.outData );
            }catch (e) {
                /////////////////////////////CONSOLE/////////////////////////////////////
                ///TODO: Console log in the code "INDEX_TEST_JS" line 152
                if( true ){
                    console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                    console.info( 'v: ', v );
                    console.info( 'i: ', i );
                    console.info( 'e: ', e );

                    //console.table( this );
                    console.groupEnd();
                }
                /////////////////////////////END CONSOLE/////////////////////////////////
            }

        });

    });

    test( "test of wrapperArg", ()=>{

        const inData = [
            [ 12, "", "negate", "negate(12)" ]
            , [ 12, "negate(12)", "negate", "negate(negate(12))" ]
            , [ "12", "negate(12)", "negate", "negate(negate(12))" ]
            , [ 0, "", "negate", "" ]
        ];

        inData.forEach( ( v, i ) => {

            try{
                expect( wrapperArg( v[ 0 ], v[ 1 ], v[ 2 ]) ).toStrictEqual( v[ 3 ] );
            }catch (e) {
                /////////////////////////////CONSOLE/////////////////////////////////////
                    ///TODO: Console log in the code "INDEX_TEST_JS" line 147
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );

                        //console.table( this );
                        console.groupEnd();
                    }
                /////////////////////////////END CONSOLE/////////////////////////////////
            }

        });


    });
});