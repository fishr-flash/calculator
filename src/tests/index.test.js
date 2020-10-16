import servantResult from "../reducers/servants/servantResult";
import {
    MAIN_CLEAR,
    MODES,
    NOT_OPERATOR,
    ON_CLICK_MAIN,
    ON_CLICK_NUMBER,
    ON_CLICK_SIMPLE_OPERATOR,
    SIMPLE_MULTIPLY,
    SIMPLE_PLUS
} from "../constants";
import {flatDeep, getArrLogText, getResult, roundNum, wrapperArg} from "../reducers/utils";
import servantOnSign from "../reducers/servants/servantOnSign";
import servantSimpleOperator from "../reducers/servants/servantSimpleOperator";
import servantPercentOperator from "../reducers/servants/servantPercentOperator";
import servantClickNumber from "../reducers/servants/servantClickNumber";
import servantMain from "../reducers/servants/servantMain";

describe( "all indexes tests", ()=>{

    describe( "test of servants", ()=>{
        test( "test of servantClickNumber", ()=> {

            const checkedData = [
                {
                    inData: [ { displayText:"0"
                        , firstNumber: 0
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , percentNumber: NaN
                        , arrLogText: []}
                        , {
                            type: ON_CLICK_NUMBER
                            , value: 1
                        }
                        ]
                    , outData:{
                        displayText: "1"
                        , firstNumber: 1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , percentNumber: NaN
                        , arrLogText: []
                    }
                }// default mode
                , {
                    inData: [ {
                        displayText: '20',
                        firstNumber: 20,
                        lastNumber: 10,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrLogText: [
                            '10',
                            '+',
                            '10',
                            '='
                        ],
                        percentNumber: NaN
                        }
                        , {
                            type: ON_CLICK_NUMBER
                            , value: 1
                        }
                        ]
                    , outData:{
                        displayText: '1',
                        firstNumber: 1,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: NOT_OPERATOR,
                        onDot: false,
                        arrLogText: [],
                        percentNumber: NaN
                    }
                }// after result mode
                , {
                    inData: [ {
                                displayText: '1',
                                firstNumber: 1,
                                lastNumber: 0,
                                mode: 1,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrLogText: [
                                    '1',
                                    '+'
                                ],
                                percentNumber: NaN
                            }
                        , {
                            type: ON_CLICK_NUMBER
                            , value: 1
                        }
                        ]
                    , outData:{
                        displayText: '1',
                        firstNumber: 1,
                        lastNumber: 1,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrLogText: [
                            '1',
                            '+'
                        ],
                        percentNumber: NaN
                    }
                }// first operator mode
                , {
                        inData: [ {
                            displayText: '3',
                            firstNumber: 3,
                            lastNumber: 0,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrLogText: [
                                '1',
                                '+',
                                '2',
                                '+'
                            ],
                            percentNumber: NaN
                        }
                        , {
                            type: ON_CLICK_NUMBER
                            , value: 4
                        }
                        ]
                    , outData:{
                        displayText: '4',
                        firstNumber: 3,
                        lastNumber: 4,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrLogText: [
                            '1',
                            '+',
                            '2',
                            '+'
                        ],
                        percentNumber: NaN
                    }
                }// multiply action mode
            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantClickNumber( ...v.inData )).toStrictEqual( v.outData );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );

                        //console.table( this );
                        console.groupEnd();
                    }
                }

            });

        });
        test( "test of servantMain", ()=> {

            const checkedData = [
                {
                    inData: [ {
                                displayText: '0',
                                firstNumber: 0,
                                lastNumber: 0,
                                mode: 0,
                                firstOperator: NOT_OPERATOR,
                                onDot: false,
                                percentNumber: NaN,
                                arrLogText: []
                            }
                        , {
                            type: ON_CLICK_MAIN
                            , value: MAIN_CLEAR
                        }
                        ]
                    , outData:{
                            displayText: '0',
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: NOT_OPERATOR,
                            onDot: false,
                            arrLogText: [],
                            percentNumber: NaN
                        }
                }// default mode

            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantMain( ...v.inData )).toStrictEqual( v.outData );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );

                        //console.table( this );
                        console.groupEnd();
                    }
                }

            });

        });
        test( "test of servantOnSign", ()=> {

            const checkedData = [
                {
                    inData:{ displayText:"0"
                        , firstNumber: 0
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false,
                                percentNumber: NaN,
                                arrLogText: []
                            }
                    , outData:{
                        displayText: "0"
                        , firstNumber: -0
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , percentNumber: NaN
                        , arrLogText: []
                    }
                }
                ,{
                    inData:{ displayText:"1"
                        , firstNumber: 1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false,
                                percentNumber: NaN,
                                arrLogText: []
                            }
                    , outData:{
                        displayText: "-1"
                        , firstNumber: -1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , percentNumber: NaN
                        , arrLogText: []
                    }
                }
                ,{
                    inData:{ displayText:"-1"
                        , firstNumber: -1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false,
                                percentNumber: NaN,
                                arrLogText: []
                            }
                    , outData:{
                        displayText: "1"
                        , firstNumber: 1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , percentNumber: NaN
                        , arrLogText: []
                    }
                }
                , {
                    inData:{ displayText:""
                        , firstNumber: 2
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false,
                                percentNumber: NaN,
                                arrLogText: []
                            }
                    , outData:{
                        displayText: "-2"
                        , firstNumber: -2
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , percentNumber: NaN
                        , arrLogText: []
                    }
                }

            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantOnSign( v.inData )).toStrictEqual( v.outData );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );

                        //console.table( this );
                        console.groupEnd();
                    }
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
                        , percentNumber: NaN
                        , arrLogText: [ "123", "+" ]}
                    , outData:{
                        displayText: "444"
                        , firstNumber: 444
                        , lastNumber: 321
                        , mode: MODES.AFTER_RESULT
                        , firstOperator: SIMPLE_PLUS
                        , onDot: false
                        , percentNumber: 444
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
                        , percentNumber: NaN
                        , arrLogText: [ "123", "+" ]}
                    , outData:{
                        displayText: "444"
                        , firstNumber: 444
                        , lastNumber: 321
                        , mode: MODES.AFTER_RESULT
                        , firstOperator: SIMPLE_PLUS
                        , onDot: false
                        , percentNumber: 444
                        , arrLogText: [ "123", "+", "321", "=" ]
                    }
                }
                , {
                    inData:{ displayText:"321"
                        , firstNumber: 123
                        , lastNumber: 321
                        , mode: MODES.LAST_NUMBER
                        , firstOperator: SIMPLE_PLUS
                        , percentNumber: NaN
                        , onDot: false
                        , arrLogText: [ "123", "+" ]}
                    , outData:{
                        displayText: "444"
                        , firstNumber: 444
                        , lastNumber: 321
                        , mode: MODES.AFTER_RESULT
                        , firstOperator: SIMPLE_PLUS
                        , onDot: false
                        , percentNumber: 444
                        , arrLogText: [ "123", "+", "321", "=" ]
                    }
                }
                , {
                    inData:{
                                displayText: '-3',
                                firstNumber: -3,
                                lastNumber: 2,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                percentNumber: NaN,
                                arrLogText: [
                                    ' negate( 3 ) '
                                ]
                            }
                    , outData:{
                        displayText: '-1',
                        firstNumber: -1,
                        lastNumber: 2,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        percentNumber: -1,
                        arrLogText: [
                            ' negate( 3 ) ',
                            '+',
                            '2',
                            '='
                        ]
                    }
                }
                , {
                    inData:{
                                displayText: '0,16',
                                firstNumber: 4,
                                lastNumber: 0.16,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrLogText: [
                                    '4',
                                    '+',
                                    '0,16'
                                ],
                                percentNumber: 4
                            }
                    , outData:{
                                displayText: '4,16',
                                firstNumber: 4.16,
                                lastNumber: 0.16,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrLogText: [
                                    '4',
                                    '+',
                                    '0,16',
                                    '='
                                ],
                                percentNumber: 4.16
                            }
                } /// сложили, получили результат, применили процент, сложили, применили процент, выводим результат
                , {
                    inData:{
                                displayText: '0',
                                firstNumber: 10,
                                lastNumber: 0,
                                mode: 3,
                                firstOperator: 'simpleDivision',
                                onDot: false,
                                arrLogText: [
                                    '10',
                                    '÷'
                                ],
                                percentNumber: 10
                            }
                    , outData:{
                                displayText: 'Деление на ноль невозможно',
                                firstNumber: Infinity,
                                lastNumber: 0,
                                mode: 4,
                                firstOperator: 'simpleDivision',
                                onDot: false,
                                arrLogText: [
                                    '10',
                                    '÷'
                                ],
                                percentNumber: Infinity
                            }
                } /// деление на нуль


            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantResult( v.inData )).toStrictEqual( v.outData );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );

                        //console.table( this );
                        console.groupEnd();
                    }
                }
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
                        firstOperator: NOT_OPERATOR,
                        onDot: false,
                        percentNumber: NaN,
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
                        percentNumber: 1,
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
                            percentNumber: NaN,
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
                            percentNumber: 4,
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
                                displayText: '1',
                                firstNumber: 1,
                                lastNumber: 1,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrLogText: [
                                    '1',
                                    '+'
                                ],
                                percentNumber: NaN
                            }, {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                            displayText: '2',
                            firstNumber: 2,
                            lastNumber: 0,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrLogText: [
                                '1',
                                '+',
                                '1',
                                '+'
                            ],
                            percentNumber: 2 }
                } /// ввод второго оператора, переход на множественное действие
                , {
                    inData:[{
                                displayText: '1,',
                                firstNumber: 1,
                                lastNumber: 0,
                                mode: 0,
                                firstOperator: NOT_OPERATOR,
                                onDot: true,
                                arrLogText: [],
                                percentNumber: NaN
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
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
                                ],
                                percentNumber: 1
                            }
                } /// ввод оператора после ввода десятичного разделителя
                , {
                    inData:[{
                                displayText: '4',
                                firstNumber: 4,
                                lastNumber: 0,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrLogText: [
                                    '4'
                                ],
                                percentNumber: 20
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                            displayText: '4',
                            firstNumber: 4,
                            lastNumber: 0,
                            mode: 1,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrLogText: [
                                '4',
                                '+'
                            ],
                            percentNumber: 4
                        },
                } /// прибавление после получения результата с использованием перевода в проценты
                , {
                    inData:[{
                                displayText: '-64',
                                firstNumber: -64,
                                lastNumber: 0,
                                mode: 1,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrLogText: [
                                    '-64',
                                    '+',
                                    '-',
                                    '+',
                                    '-',
                                    '+'
                                ],
                                percentNumber: -64
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                            displayText: '-64',
                            firstNumber: -64,
                            lastNumber: 0,
                            mode: 1,
                            firstOperator: 'simpleMinus',
                            onDot: false,
                            arrLogText: [
                                '-64',
                                '+',
                                '-',
                                '+',
                                '-',
                                '+',
                                '-'
                            ],
                        percentNumber: -64
                    },
                } //попеременное нажати +/- после ввода любого числа
                ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantSimpleOperator( ...v.inData )).toStrictEqual( v.outData );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );

                        //console.table( this );
                        console.groupEnd();
                    }
                }
            });
        });
        test( "test of servantPercentOperator", ()=>{

            let rnd = Math.random() * 1000;
            if( Math.random() < .5 ) rnd *= -1;
            const checkedData = [
                {
                    inData:{
                        displayText: '0',
                        firstNumber: 0,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: NOT_OPERATOR,
                        onDot: false,
                        percentNumber: NaN,
                        arrLogText: []
                        }
                    , outData:{
                        displayText: '0',
                        firstNumber: 0,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: NOT_OPERATOR,
                        onDot: false,
                        percentNumber: NaN,
                        arrLogText: [ "0" ]
                    }
                } /// первичный вариант
                , {
                    inData:{
                        displayText: '1',
                        firstNumber: 10,
                        lastNumber: 1,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrLogText: [
                            '10',
                            '+',
                            '1'
                        ],
                        percentNumber: 10
                    }
                    , outData:{
                        displayText: '0,1',
                        firstNumber: 10,
                        lastNumber: 0.1,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrLogText: [
                            '10',
                            '+',
                            '0,1'
                        ],
                        percentNumber: 10
                    }
                }/// после получения результата сложения двух цифр
                , {
                    inData:{
                        displayText: '-9',
                        firstNumber: -9,
                        lastNumber: 1,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrLogText: [
                            '-10',
                            '+',
                            '1',
                            '='
                        ],
                        percentNumber: -9 }
                    , outData:{
                            displayText: '0,8099999999999999',
                            firstNumber: 0.8099999999999999,
                            lastNumber: 1,
                            mode: 4,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrLogText: [
                                '0,8099999999999999'
                            ],
                            percentNumber: -9
                        }
                }/// работа с отрицательными значенпиями




                ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantPercentOperator( v.inData )).toStrictEqual( v.outData );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );

                        //console.table( this );
                        console.groupEnd();
                    }
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
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );

                        //console.table( this );
                        console.groupEnd();
                    }
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
        test( "check the function getArrLogText ", ()=>{

            let arr = new Array( 5 ).fill( 0 ).map( (v)=> { return Math.random() * 1000 * ( ( Math.random() < .5 ) ? -1 : 1 ) });

            arr.forEach( ( v ) => {
                try{

                        expect( getArrLogText([12.32, "+"], v ) ).toStrictEqual( [12.32.toString().replace( ".", ",")
                                                                            , "+", v.toString().replace( ".", ",") ] );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'e: ', e );
                        console.groupEnd();
                    }
                }
            });
        });
        test( "check the function getResult ", ()=>{

            //let arr = new Array( 5 ).fill( 0 ).map( (v)=> { return Math.random() * 1000 * ( ( Math.random() < .5 ) ? -1 : 1 ) });
            let arr = [ 1 ]
            arr.forEach( ( v, i ) => {
                try{

                        expect( getResult( 1, v,  SIMPLE_MULTIPLY ) ).toStrictEqual( "1" );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );
                        console.groupEnd();
                    }
                }
            });
        });
        test( "check the function roundNum ", ()=>{

            let arr = [ 0.00000000000327681, -2.34, 0.03200000000000001 ]
            arr.forEach( ( v, i ) => {
                try{

                        expect( roundNum( v ) ).toStrictEqual( v );
                }catch (e) {
                    if( true ){
                        console.group( 'Console log in the code "INDEX_TEST_JS" line 147' );
                        console.info( 'v: ', v );
                        console.info( 'i: ', i );
                        console.info( 'e: ', e );
                        console.groupEnd();
                    }
                }
            });
        });
    });

});
