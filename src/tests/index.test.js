import servantResult from "../reducers/servants/servantResult";
import {MODES, ON_CLICK_SIGN, ON_CLICK_SIMPLE_OPERATOR, SIMPLE_MINUS, SIMPLE_PLUS} from "../constants";
import {flatDeep, wrapperArg} from "../reducers/utils";
import servantOnSign from "../reducers/servants/servantOnSign";
import servantSimpleOperator from "../reducers/servants/servantSimpleOperator";

describe( "", ()=>{

    describe( "test of servants", ()=>{
        test( "test of servantOnSign", ()=> {

            const checkedData = [
                {
                    inData:{ displayText:"0"
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
                ,{
                    inData:{ displayText:"1"
                        , firstNumber: 1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: null
                        , onDot: false
                        , arrLogText: []}
                    , outData:{
                        displayText: "-1"
                        , firstNumber: -1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: null
                        , onDot: false
                        , arrLogText: []
                    }
                }
                ,{
                    inData:{ displayText:"-1"
                        , firstNumber: -1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: null
                        , onDot: false
                        , arrLogText: []}
                    , outData:{
                        displayText: "1"
                        , firstNumber: 1
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
        test( "test of servantResult", ()=>{

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
        test( "test of servantSimpleOperator", ()=>{

            const checkedData = [
                {
                    inData:[{
                        displayText: '1',
                        firstNumber: 1,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: null,
                        onDot: false,
                        arrLogText: []
                        }
                        , {
                            type: ON_CLICK_SIMPLE_OPERATOR
                            , value: SIMPLE_PLUS
                        }]
                    , outData:{
                        displayText: '1',
                        firstNumber: 1,
                        lastNumber: 0,
                        mode: 1,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrLogText: [
                            '1',
                            '+'
                        ]
                    }
                } /// первичный вариант: нажали цифру, нажали простой оператор
                , {
                    inData:[{
                            displayText: '3',
                            firstNumber: 1,
                            lastNumber: 3,
                            mode: 3,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrLogText: [
                                '1',
                                '+'
                            ]
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                            displayText: '4',
                            firstNumber: 4,
                            lastNumber: 0,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrLogText: [
                                '1',
                                '+',
                                '3',
                                '+'
                            ]
                        }
                } /// множественное прибавление
                , {
                    inData:[{
                                displayText: '-3',
                                firstNumber: -3,
                                lastNumber: 2,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrLogText: [
                                    ' negate( 3 ) '
                                ]
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                                displayText: '-3',
                                firstNumber: -3,
                                lastNumber: 0,
                                mode: 1,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrLogText: [
                                    ' negate( 3 ) ',
                                    '+'
                                ]
                            }
                } /// множественное прибавление
                ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantSimpleOperator( ...v.inData )).toStrictEqual( v.outData );
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
    });

    describe( "test functions of utils", ()=>{
        test( "test of wrapperArg", ()=>{

            const inData = [
                { nm: 12, log: "", wrapText: "negate", answer: "negate( 12 )"}
                , { nm: 0, log: "", wrapText: "negate", answer: "negate( 0 )"}
            ];

            inData.forEach( ( v, i ) => {

                try{
                    expect( wrapperArg( v.nm, v.log, v.wrapText) ).toStrictEqual( v.answer );
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
});
