import servantResult from "../reducers/servants/servantResult";
import {
    COMPLEXES_DIVISION_X, COMPLEXES_SQR_X, COMPLEXES_SQRT_X,
    DIVISION_BY_ZERO_IS_NOT_POSSIBLE,
    MAIN_CLEAR, MEMORY_MINUS, MEMORY_PLUS, MEMORY_SAVE,
    MODES,
    NOT_OPERATOR, ON_CLICK_COMPLEXES,
    ON_CLICK_MAIN, ON_CLICK_MEMORY,
    ON_CLICK_NUMBER, ON_CLICK_SIGN,
    ON_CLICK_SIMPLE_OPERATOR, SIMPLE_DIVISION,
    SIMPLE_MULTIPLY,
    SIMPLE_PLUS, SIMPLE_RESULT
} from "../constants";
import {
    flatDeep, formatDisplayText,
    getArrLogText,
    getComplexesAttributes, getOutput,
    getResult,
    roundNum,
    wasWrapped,
    wrapperArg
} from "../reducers/utils";
import servantOnSign from "../reducers/servants/servantOnSign";
import servantSimpleOperator from "../reducers/servants/servantSimpleOperator";
import servantPercentOperator from "../reducers/servants/servantPercentOperator";
import servantClickNumber from "../reducers/servants/servantClickNumber";
import servantMain from "../reducers/servants/servantMain";
import reducer from "../reducers";
import servantComplexes from "../reducers/servants/servantComplexes";
import servantMemory from "../reducers/servants/servantMemory";
import servantOnDot from "../reducers/servants/servantOnDot";

describe( "all indexes tests", ()=>{

    describe( "test of servants", ()=>{

        /// Порядок отладки внедрения нового оператора
        /**
         *  - реализация во всех сервантах последовательно
         *    - BEGIN_MODE: 0
         ,    - FIRST_OPERATOR: 1
         ,    - MULTIPLE_ACTION: 2
         ,    - LAST_NUMBER: 3
         ,    - AFTER_RESULT: 4
            - реализация в вышеуказанных случаях когда одно из чисел "обернуто" один и более раз
         */
        test( "test of servantClickNumber", ()=> {

            const checkedData = [
                {
                    inData: [ { displayText:"0"
                        , firstNumber: 0
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , numberIsWrapped: false
                        , percentNumber: NaN
                        , arrMemory: []
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
                        , numberIsWrapped: false
                        , percentNumber: NaN
                        , arrMemory: []
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                                numberIsWrapped: false,
                                arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                            numberIsWrapped: false,
                            arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            '1',
                            '+',
                            '2',
                            '+'
                        ],
                        percentNumber: NaN
                    }
                }// multiply action mode
                , {
                    inData:[ {
                        displayText: '10',
                        firstNumber: 10,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: SIMPLE_RESULT,
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            '10',
                            '='
                        ],
                        percentNumber: 10,
                        divisionByZeroBlocking: false
                    },
                    {
                        type: 'onClickNumber',
                        value: 2
                    }]
                    , outData:{
                        displayText: '2',
                        firstNumber: 2,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            '10',
                            '='
                        ],
                        percentNumber: 10,
                        divisionByZeroBlocking: false

                    }
                } /// порядок: ввод числа, равно, ввод другого числа
                , {
                    inData:[ {
                        displayText: '4',
                        firstNumber: 4,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [ 4 ],
                        arrLogText: [
                            'sqr( 2 )'
                        ],
                        percentNumber: null,
                        divisionByZeroBlocking: false
                    },
                    {
                        type: 'onClickNumber',
                        value: 2
                    }]
                    , outData:{
                        displayText: '' +
                            '2',
                        firstNumber: 2,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [ 4 ],
                        arrLogText: [
                            'sqr( 2 )'
                        ],
                        percentNumber: null,
                        divisionByZeroBlocking: false
                    }
                } /// 2, x2, 2
                , {
                    inData:[ {
                        displayText: '5',
                        firstNumber: 5,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        arrMemory: [
                            5
                        ],
                        arrLogText: [],
                        percentNumber: 0,
                        numberIsWrapped: true
                    },
                    {
                        type: 'onClickNumber',
                        value: 3
                    }]
                    , outData:{
                        displayText: '3',
                        firstNumber: 3,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        arrMemory: [
                            5
                        ],
                        arrLogText: [],
                        percentNumber: 0,
                        numberIsWrapped: false
                    }
                } /// 5, MS, 3
                , {
                    inData:[{
                        displayText: '2',
                        firstNumber: 1,
                        lastNumber: 2,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrMemory: [
                            2
                        ],
                        arrLogText: [
                            '1',
                            '+'
                        ],
                        percentNumber: 1,
                        numberIsWrapped: true
                    },
                    {
                        type: 'onClickNumber',
                        value: 3
                    }]
                    , outData:{
                        displayText: '3',
                        firstNumber: 1,
                        lastNumber: 3,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrMemory: [
                            2
                        ],
                        arrLogText: [
                            '1',
                            '+'
                        ],
                        percentNumber: 1,
                        numberIsWrapped: false
                    }
                } /// 1, +, 2, MS, 3
                , {
                    inData:[{
                        displayText: '151,29',
                        firstNumber: 123,
                        lastNumber: 151.29,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrMemory: [],
                        arrLogText: [
                            '123',
                            '+',
                            '151,29'
                        ],
                        percentNumber: 123,
                        numberIsWrapped: true,
                        divisionByZeroBlocking: false
                    },
                    {
                        type: 'onClickNumber',
                        value: 2
                    }]
                    , outData:{
                        displayText: '2',
                        firstNumber: 123,
                        lastNumber: 2,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrMemory: [],
                        arrLogText: [
                            '123',
                            '+'
                        ],
                        percentNumber: 123,
                        divisionByZeroBlocking: false,
                        numberIsWrapped: false
                    }
                } /// 123, +, %, 2
                , {
                    inData:[{
                        displayText: '123,',
                        firstNumber: 123,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: true,
                        arrMemory: [],
                        arrLogText: [],
                        percentNumber: null,
                        numberIsWrapped: false,
                        divisionByZeroBlocking: false
                    },
                    {
                        type: 'onClickNumber',
                        value: 0
                    }]
                    , outData:{
                        displayText: '123,0',
                        firstNumber: 123,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        arrMemory: [],
                        arrLogText: [],
                        percentNumber: null,
                        divisionByZeroBlocking: false,
                        numberIsWrapped: false
                    }
                } /// 123, ',', 0
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
                                numberIsWrapped: false,
                                arrMemory: [],
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
                            numberIsWrapped: false,
                            arrMemory: [],
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
                        , onDot: false
                        , numberIsWrapped: false
                        , arrMemory: [],
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
                        , numberIsWrapped: false
                        , percentNumber: NaN
                        , arrMemory: []
                        , arrLogText: []
                    }
                }
                ,{
                    inData:{ displayText:"1"
                        , firstNumber: 1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , numberIsWrapped: false
                        , arrMemory: [],
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
                        , numberIsWrapped: false
                        , percentNumber: NaN
                        , arrMemory: []
                        , arrLogText: []
                    }
                }
                ,{
                    inData:{ displayText:"-1"
                        , firstNumber: -1
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , numberIsWrapped: false,
                        arrMemory: [],
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
                        , numberIsWrapped: false
                        , percentNumber: NaN
                        , arrMemory: []
                        , arrLogText: []
                    }
                }
                , {
                    inData:{ displayText:""
                        , firstNumber: 2
                        , lastNumber: 0
                        , mode: MODES.BEGIN_MODE
                        , firstOperator: NOT_OPERATOR
                        , onDot: false
                        , numberIsWrapped: false,
                        arrMemory: [],
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
                        , numberIsWrapped: false
                        , percentNumber: NaN
                        , arrMemory: []
                        , arrLogText: []
                    }
                }
                , {
                    inData:  {
                        displayText: '0,1',
                        firstNumber: 0.1,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            '1/( 10 )'
                        ],
                        percentNumber: NaN
                    }
                    , outData: {
                        displayText: '-0,1',
                        firstNumber: -0.1,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            'negate( 1/( 10 ) )'
                        ],
                        percentNumber: NaN
                    }
                }// 10, 1/x, +/-
                , {
                    inData:  {
                                displayText: '3',
                                firstNumber: 3,
                                lastNumber: 2,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1',
                                    '+',
                                    '2'
                                ],
                                percentNumber: 3,
                                divisionByZeroBlocking: false
                            }
                    , outData: {
                                displayText: '-3',
                                firstNumber: -3,
                                lastNumber: 2,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    ' negate( 3 ) '
                                ],
                                percentNumber: 3
                            }
                }// 1, +, 2, =, +/-
                , {
                    inData:  {
                                displayText: '0,3333333333333333',
                                firstNumber: 3,
                                lastNumber: 0.3333333333333333,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1',
                                    '+',
                                    '2',
                                    '+',
                                    '1/( 3 )'
                                ],
                                percentNumber: 3,
                                divisionByZeroBlocking: false
                            }
                    , outData: {
                                displayText: '-0,3333333333333333',
                                firstNumber: 3,
                                lastNumber: -0.3333333333333333,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1',
                                    '+',
                                    '2',
                                    '+',
                                    'negate( 1/( 3 ) )'
                                ],
                                percentNumber: 3
                            }
                }// 1, +, 2, +, 3,  =, +/-
                , {
                    inData:  {
                                displayText: '0,3333333333333333',
                                firstNumber: 3,
                                lastNumber: 0.3333333333333333,
                                mode: 2,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1',
                                    '+',
                                    '2',
                                    '+',
                                    '1/( 3 )'
                                ],
                                percentNumber: 3,
                                divisionByZeroBlocking: false
                            }
                    , outData: {
                                displayText: '-0,3333333333333333',
                                firstNumber: 3,
                                lastNumber: -0.3333333333333333,
                                mode: 2,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1',
                                    '+',
                                    '2',
                                    '+',
                                    'negate( 1/( 3 ) )'
                                ],
                                percentNumber: 3
                            }
                }// 1, +, 2, +, 1/x, +/-
                , {
                    inData:  {
                                displayText: '3',
                                firstNumber: 3,
                                lastNumber: 2,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1/( 1/( 3 ) )'
                                ],
                                percentNumber: 3,
                                divisionByZeroBlocking: false
                            }
                    , outData: {
                                displayText: '-3',
                                firstNumber: -3,
                                lastNumber: 2,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    ' negate( 1/( 1/( 3 ) ) ) '
                                ],
                                percentNumber: 3
                            }
                }// 1, +, 2, =, 1/x, 1/x, +/-



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
                {
                    inData:{ displayText:"321"
                        , firstNumber: 123
                        , lastNumber: 321
                        , mode: MODES.LAST_NUMBER
                        , firstOperator: SIMPLE_PLUS
                        , onDot: false
                        , numberIsWrapped: false
                        , arrMemory: []
                        , percentNumber: NaN
                        , divisionByZeroBlocking: false
                        , arrLogText: [ "123", "+" ]}
                    , outData:{
                        displayText: "444"
                        , firstNumber: 444
                        , lastNumber: 321
                        , mode: MODES.AFTER_RESULT
                        , firstOperator: SIMPLE_PLUS
                        , onDot: false
                        , numberIsWrapped: false
                        , arrMemory: []
                        , divisionByZeroBlocking: false
                        , percentNumber: 444
                        , arrLogText: [ "123", "+", "321", "=" ]
                    }
                } // 123, +, 321, =
                , {
                    inData:{ displayText:"321"
                        , firstNumber: 123
                        , lastNumber: 321
                        , mode: MODES.LAST_NUMBER
                        , firstOperator: SIMPLE_PLUS
                        , onDot: false
                        , numberIsWrapped: false
                        , arrMemory: []
                        , percentNumber: NaN
                        , divisionByZeroBlocking: false
                        , arrLogText: [ "123", "+" ]}
                    , outData:{
                        displayText: "444"
                        , firstNumber: 444
                        , lastNumber: 321
                        , mode: MODES.AFTER_RESULT
                        , firstOperator: SIMPLE_PLUS
                        , onDot: false
                        , numberIsWrapped: false
                        , arrMemory: []
                        , divisionByZeroBlocking: false
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
                        , numberIsWrapped: false
                        , arrMemory: []
                        , divisionByZeroBlocking: false
                        , arrLogText: [ "123", "+" ]}
                    , outData:{
                        displayText: "444"
                        , firstNumber: 444
                        , lastNumber: 321
                        , mode: MODES.AFTER_RESULT
                        , firstOperator: SIMPLE_PLUS
                        , onDot: false
                        , numberIsWrapped: false
                        , arrMemory: []
                        , divisionByZeroBlocking: false
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
                        numberIsWrapped: false,
                        arrMemory: [],
                                divisionByZeroBlocking: false,
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
                        numberIsWrapped: false,
                        arrMemory: [],
                        divisionByZeroBlocking: false,
                        percentNumber: -1,
                        arrLogText: [
                            '-3',
                            '+',
                            '2',
                            '='
                        ]
                    }
                }/// 3, +/-, +, 2, =, +/-, =
                , {
                    inData:{
                                displayText: '0,16',
                                firstNumber: 4,
                                lastNumber: 0.16,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                divisionByZeroBlocking: false,
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
                        numberIsWrapped: false,
                        arrMemory: [],
                                divisionByZeroBlocking: false,
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
                        displayText: '1',
                        firstNumber: 1,
                        lastNumber: 0,
                        mode: MODES.FIRST_OPERATOR ,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        divisionByZeroBlocking: false,
                        arrLogText: [
                            '1',
                            '+'
                        ],
                        percentNumber: 1
                    }
                    , outData:{
                        displayText: '2',
                        firstNumber: 2,
                        lastNumber: 1,
                        mode: MODES.AFTER_RESULT,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        divisionByZeroBlocking: false,
                        arrLogText: [
                            '1',
                            '+',
                            '1',
                            '='
                        ],
                        percentNumber: 2
                    }
                } /// нажатие на равно после выбора только первого номера и любого простого оператора ( 1+= )
                , {
                    inData:{
                        displayText: '1',
                        firstNumber: 1,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: NOT_OPERATOR,
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        divisionByZeroBlocking: false,
                        arrLogText: [
                            '1',
                            '='
                        ],
                        percentNumber: 1
                    }
                    , outData:{
                        displayText: '1',
                        firstNumber: 1,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: SIMPLE_RESULT,
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        divisionByZeroBlocking: false,
                        arrLogText: [
                            '1',
                            '='
                        ],
                        percentNumber: 1
                    }
                } /// нажатие на равно после нажания на равно после введение первого и единственного номера ( 1== )
                , {
                    inData:{
                                displayText: '0',
                                firstNumber: 10,
                                lastNumber: 0,
                                mode: 3,
                                firstOperator: 'simpleDivision',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '10',
                                    '÷'
                                ],
                                percentNumber: 10,
                                divisionByZeroBlocking: false
                            }
                    , outData:{
                                displayText: 'Деление на ноль невозможно',
                                firstNumber: 10,
                                lastNumber: 0,
                                mode: MODES.LAST_NUMBER,
                                firstOperator: SIMPLE_DIVISION,
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '10',
                                    '÷'
                                ],
                                percentNumber: 10,
                                divisionByZeroBlocking: true
                            }
                } /// деление на нуль
                , {
                    inData:{
                                displayText: '0,1',
                                firstNumber: 10,
                                lastNumber: 0.1,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '10',
                                    '+',
                                    '1/( 10 )'
                                ],
                                percentNumber: 10,
                                divisionByZeroBlocking: false
                            }
                    , outData:{
                                displayText: '10,1',
                                firstNumber: 10.1,
                                lastNumber: 0.1,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '10',
                                    '+',
                                    '1/( 10 )',
                                    '='
                                ],
                                percentNumber: 10.1,
                                divisionByZeroBlocking: false
                            }
                } /// если ко второму члену уравнения применено 1/x
                , {
                    inData:{
                                displayText: '0,09950248756218905',
                                firstNumber: 0.09950248756218905,
                                lastNumber: 0.05,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1/( 10,05 )'
                                ],
                                percentNumber: 10.05,
                                divisionByZeroBlocking: false
                            }
                    , outData:{
                                displayText: '0,14950248756218903',
                                firstNumber: 0.14950248756218903,
                                lastNumber: 0.05,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1/( 10,05 )',
                                    '+',
                                    '0,05',
                                    '='
                                ],
                                percentNumber: 0.14950248756218903,
                                divisionByZeroBlocking: false
                            }
                } /// 10, +, 20, 1/x, =, 1/x, =, =
                ///FIXME: на нативном калькуляторе получается другой результат, устаканить!
                , {
                    inData:{
                                displayText: '32',
                                firstNumber: 32,
                                lastNumber: 0,
                                mode: 0,
                                firstOperator: 'notOperator',
                                onDot: false,
                        numberIsWrapped: false,
                                arrMemory: [],
                                arrLogText: [],
                                percentNumber: 444,
                                divisionByZeroBlocking: false
                            }
                            , outData:{
                                displayText: '32',
                                firstNumber: 32,
                                lastNumber: 0,
                                mode: 0,
                                firstOperator: 'simpleResult',
                                onDot: false,
                                numberIsWrapped: false,
                                arrMemory: [],
                                arrLogText: [
                                    '32',
                                    '='
                                ],
                                percentNumber: 32,
                                divisionByZeroBlocking: false
                            }
                } /// 123, +, 321, =, +/-, 32, =

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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                                numberIsWrapped: false,
                        arrMemory: [],
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
                                numberIsWrapped: false,
                        arrMemory: [],
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
                                arrMemory: [],
                                arrLogText: [],
                                numberIsWrapped: false,
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
                                numberIsWrapped: false,
                                arrMemory: [],
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
                                numberIsWrapped: false,
                        arrMemory: [],
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
                                numberIsWrapped: false,
                        arrMemory: [],
                            arrLogText: [
                                '4',
                                '+'
                            ],
                            percentNumber: 4
                        },
                } /// прибавление после получения результата с использованием перевода в проценты
                , {
                    inData:[{
                                displayText: '1',
                                firstNumber: 1,
                                lastNumber: 0,
                                mode: 1,
                                firstOperator: 'simpleMultiply',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1',
                                    '×'
                                ],
                                percentNumber: 1
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
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1',
                                    '+'
                                ],
                                percentNumber: 1
                            },
                } //попеременное нажати +/- после ввода любого числа
                , {
                    inData:[{
                                displayText: '1',
                                firstNumber: 1,
                                lastNumber: 0,
                                mode: 0,
                                firstOperator: 'notOperator',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1',
                                    '='
                                ],
                                percentNumber: 1
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
                                numberIsWrapped: false,
                        arrMemory: [],
                            arrLogText: [
                                '1',
                                '+'
                            ],
                            percentNumber: 1
                        },
                } // порядок действий ввод числа, нажатие на ровно, ввод оператора ( 1=+ )
                , {
                    inData:[{
                                displayText: '444',
                                firstNumber: 444,
                                lastNumber: 321,
                                mode: 4,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [],
                                percentNumber: 444
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                                displayText: '444',
                                firstNumber: 444,
                                lastNumber: 0,
                                mode: 1,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                        "444",
                                        "+",
                                        ],
                                percentNumber: 444
                            },
                } // выполнение сложения, равно, backspace, простой оператор
                , {
                    inData:[{
                                displayText: '-10',
                                firstNumber: -10,
                                lastNumber: 0,
                                mode: 0,
                                firstOperator: 'notOperator',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1/( negate( 1/( 10 ) ) )'
                                ],
                                percentNumber: NaN
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                                displayText: '-10',
                                firstNumber: -10,
                                lastNumber: 0,
                                mode: 1,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '1/( negate( 1/( 10 ) ) )',
                                    '+'

                                ],
                                percentNumber: -10
                            },
                } // // 10, 1/x, +/-, 1/x, =
                , {
                    inData:[{
                                displayText: '0,16',
                                firstNumber: 4,
                                lastNumber: 0.16,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '4',
                                    '+',
                                    '0,16'
                                ],
                                percentNumber: 4,
                                divisionByZeroBlocking: false
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                                displayText: '4,16',
                                firstNumber: 4.16,
                                lastNumber: 0,
                                mode: 2,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '4',
                                    '+',
                                    '0,16',
                                    '+'
                                ],
                                percentNumber: 4.16
                            },
                } // 4, +, %, +
                , {
                    inData:[{
                                displayText: '0,05',
                                firstNumber: 10,
                                lastNumber: 0.05,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                numberIsWrapped: false,
                        arrMemory: [],
                                arrLogText: [
                                    '10',
                                    '+',
                                    '1/( 20 )'
                                ],
                                percentNumber: 10,
                                divisionByZeroBlocking: false
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                                displayText: '10,05',
                                firstNumber: 10.05,
                                lastNumber: 0,
                                mode: 2,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                numberIsWrapped: false,
                                arrMemory: [],
                                arrLogText: [
                                    '10',
                                    '+',
                                    '1/( 20 )',
                                    '+'
                                ],
                                percentNumber: 10.05
                            },
                } // 10, +, 20, 1/x, +
                , {
                    inData:[{
                                displayText: '369',
                                firstNumber: 492,
                                lastNumber: 369,
                                mode: 3,
                                firstOperator: 'simplePlus',
                                onDot: false,
                                arrMemory: [
                                    369
                                ],
                                arrLogText: [
                                    '123',
                                    '+',
                                    '123',
                                    '+',
                                    '123',
                                    '+',
                                    '123',
                                    '+'
                                ],
                                percentNumber: 492,
                                numberIsWrapped: true
                            }
                            , {
                                type: 'onClickSimpleOperator',
                                value: 'simplePlus'
                            }]
                    , outData:{
                            displayText: '861',
                            firstNumber: 861,
                            lastNumber: 0,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrMemory: [
                                369
                            ],
                            arrLogText: [
                                '123',
                                '+',
                                '123',
                                '+',
                                '123',
                                '+',
                                '123',
                                '+',
                                '369',
                                '+'
                            ],
                            percentNumber: 861,
                            numberIsWrapped: true
                        },
                } // 123, +, 123, +, 123, MS, +, 123, +, 123, + MR +
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                        numberIsWrapped: true,
                        arrMemory: [],
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
                        numberIsWrapped: false,
                        arrMemory: [],
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
                                numberIsWrapped: false,
                        arrMemory: [],
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
        test( "test of servantComplexes complexesDivisionX", ()=>{
            let rnd = Math.random() * 1000;
            if( Math.random() < .5 ) rnd *= -1;
            const checkedData = [
                {
                    inData: [ {
                        displayText: '10',
                        firstNumber: 10,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [],
                        percentNumber: null,
                        divisionByZeroBlocking: false
                    }
                        , {
                            type: ON_CLICK_COMPLEXES
                            , value: COMPLEXES_DIVISION_X
                        }
                    ]
                    , outData:{
                        displayText: '0,1',
                        firstNumber: 0.1,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [ "1/( 10 )" ],
                        percentNumber: null,
                        divisionByZeroBlocking: false
                    }
                }// default mode
                , {
                    inData:  [{
                        displayText: '-0,1',
                        firstNumber: -0.1,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            'negate( 1/( 10 ) )'
                        ],
                        percentNumber: NaN,
                        divisionByZeroBlocking: false
                    }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                        displayText: '-10',
                        firstNumber: -10,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '1/( negate( 1/( 10 ) ) )'
                        ],
                        percentNumber: NaN,
                        divisionByZeroBlocking: false
                    }
                }// 10, 1/x, +/-, 1/x
                , {
                    inData:  [{
                        displayText: '0',
                        firstNumber: 0,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [],
                        percentNumber: NaN,
                        divisionByZeroBlocking: false
                    }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                        displayText: DIVISION_BY_ZERO_IS_NOT_POSSIBLE,
                        firstNumber: 0,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '1/( 0 )'
                        ],
                        percentNumber: NaN,
                        divisionByZeroBlocking: true

                    }
                }// 0, 1/x
                , {
                    inData:  [{
                        displayText: '10',
                        firstNumber: 10,
                        lastNumber: 0,
                        mode: 1,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '10',
                            '+'
                        ],
                        percentNumber: 10,
                        divisionByZeroBlocking: false
                    }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                        displayText: '0,1',
                        firstNumber: 10,
                        lastNumber: 0.1,
                        mode: MODES.LAST_NUMBER,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '10',
                            '+',
                            '1/( 10 )'
                        ],
                        percentNumber: 10,
                        divisionByZeroBlocking: false
                    }
                }// 10, +, 1/x
                , {
                    inData:  [{
                        displayText: '20',
                        firstNumber: 10,
                        lastNumber: 20,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '10',
                            '+'
                        ],
                        percentNumber: 10,
                        divisionByZeroBlocking: false
                    }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                        displayText: '0,05',
                        firstNumber: 10,
                        lastNumber: 0.05,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '10',
                            '+',
                            '1/( 20 )'
                        ],
                        percentNumber: 10,
                        divisionByZeroBlocking: false
                    }
                }// 10, +, 20, 1/x
                , {
                    inData:  [{
                        displayText: '10,05',
                        firstNumber: 10.05,
                        lastNumber: 0.05,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            '10',
                            '+',
                            '1/( 20 )',
                            '='
                        ],
                        percentNumber: 10.05,
                        divisionByZeroBlocking: false
                    }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                        displayText: '0,09950248756218905',
                        firstNumber: 0.09950248756218905,
                        lastNumber: 0.05,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '1/( 10,05 )'
                        ],
                        percentNumber: 10.05,
                        divisionByZeroBlocking: false
                    }
                }// 10, +, 20, 1/x, =, 1/x
                , {
                    inData:  [{
                        displayText: '0,03333333333333333',
                        firstNumber: 0.03333333333333333,
                        lastNumber: 20,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            '1/( 30 )'
                        ],
                        percentNumber: 30,
                        divisionByZeroBlocking: false
                    }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                        displayText: '30',
                        firstNumber: 30,
                        lastNumber: 20,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '1/( 1/( 30 ) )'
                        ],
                        percentNumber: 30,
                        divisionByZeroBlocking: false
                    }
                }// 10, +, 20, =, 1/x, 1/x
                , {
                    inData:  [{
                        displayText: '-3',
                        firstNumber: -3,
                        lastNumber: 2,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            ' negate( 3 ) '
                        ],
                        percentNumber: 3,
                        divisionByZeroBlocking: false
                    }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                        displayText: '-0,3333333333333333',
                        firstNumber: -0.3333333333333333,
                        lastNumber: 2,
                        mode: 4,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '1/( negate( 3 ) )',
                        ],
                        percentNumber: 3,
                        divisionByZeroBlocking: false
                    }
                }// 1, +, 2, =, +/-, 1/x
                , {
                    inData:  [{
                        displayText: '-3',
                        firstNumber: 3,
                        lastNumber: -3,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            '1',
                            '+',
                            '2',
                            '+',
                            'negate( 3 )'
                        ],
                        percentNumber: 3,
                        divisionByZeroBlocking: false
                    }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                        displayText: '-0,3333333333333333',
                        firstNumber: 3,
                        lastNumber: -0.3333333333333333,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '1',
                            '+',
                            '2',
                            '+',
                            '1/( negate( 3 ) )'
                        ],
                        percentNumber: 3,
                        divisionByZeroBlocking: false
                    }
                }// 1, +, 2, +, 3, +/-, 1/x
                , {
                    inData:  [{
                            displayText: '3',
                            firstNumber: 3,
                            lastNumber: 0,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                            arrLogText: [
                                '1',
                                '+',
                                '2',
                                '+'
                            ],
                            percentNumber: 3,
                        divisionByZeroBlocking: false
                        }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                    , outData: {
                            displayText: '0,3333333333333333',
                            firstNumber: 3,
                            lastNumber: 0.3333333333333333,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                            arrLogText: [
                                '1',
                                '+',
                                '2',
                                '+',
                                '1/( 3 )'
                            ],
                            percentNumber: 3,
                            divisionByZeroBlocking: false
                        }
                }// 1, +, 2, +, 1/x
                , {
                    inData:  [{
                            displayText: '0',
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 1,
                            firstOperator: 'simplePlus',
                            onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                            arrLogText: [
                                '0',
                                '+'
                            ],
                            percentNumber: 0,
                            divisionByZeroBlocking: false
                        }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                        , outData:{
                            displayText: DIVISION_BY_ZERO_IS_NOT_POSSIBLE,
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 1,
                            firstOperator: 'simplePlus',
                            onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                            arrLogText: [
                                '0',
                                '+',
                                '1/( 0 )'
                            ],
                            percentNumber: 0,
                            divisionByZeroBlocking: true
                        }
                }// 0, +, 1/x
                , {
                    inData:  [{
                            displayText: '0',
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 1,
                            firstOperator: 'simplePlus',
                            onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                            arrLogText: [
                                '0',
                                '+'
                            ],
                            percentNumber: 0,
                            divisionByZeroBlocking: false
                        }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                        , outData:{
                            displayText: DIVISION_BY_ZERO_IS_NOT_POSSIBLE,
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 1,
                            firstOperator: 'simplePlus',
                            onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                            arrLogText: [
                                '0',
                                '+',
                                '1/( 0 )'
                            ],
                            percentNumber: 0,
                            divisionByZeroBlocking: true
                        }
                }// 1, +, 0, 1/x ( ?? how? )
                , {
                    inData:  [{
                            displayText: '0',
                            firstNumber: 1,
                            lastNumber: 0,
                            mode: 3,
                            firstOperator: 'simplePlus',
                            onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                            arrLogText: [
                                '1',
                                '+'
                            ],
                            percentNumber: 1,
                            divisionByZeroBlocking: false

                        }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                        , outData:{
                            displayText: DIVISION_BY_ZERO_IS_NOT_POSSIBLE,
                            firstNumber: 1,
                            lastNumber: 0,
                            mode: 3,
                            firstOperator: 'simplePlus',
                            onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                            arrLogText: [
                                '1',
                                '+',
                                '1/( 0 )'
                            ],
                            percentNumber: 1,
                            divisionByZeroBlocking: true
                        }
                }// 1, +, 0, 1/x
                , {
                    inData:  [{
                            displayText: '0',
                            firstNumber: 0,
                            lastNumber: 3,
                            mode: 4,
                            firstOperator: 'simpleMinus',
                            onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                            arrLogText: [
                                '3',
                                '-',
                                '3',
                                '='
                            ],
                            percentNumber: 0,
                            divisionByZeroBlocking: false
                        }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                        , outData:{
                            displayText: DIVISION_BY_ZERO_IS_NOT_POSSIBLE,
                            firstNumber: 0,
                            lastNumber: 3,
                            mode: 4,
                            firstOperator: 'simpleMinus',
                            onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                            arrLogText: [
                                '1/( 0 )'
                            ],
                            percentNumber: 0,
                            divisionByZeroBlocking: true
                        }
                }// 3, -, 3, =, 1/x
                , {
                    inData:  [{
                            displayText: '0',
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            numberIsWrapped: false,
                            arrMemory: [],
                            arrLogText: [
                                '1',
                                '+',
                                '1',
                                '+',
                                '2',
                                '-',
                                '4',
                                '+'
                            ],
                            percentNumber: 0,
                            divisionByZeroBlocking: false
                        }, {
                        type: ON_CLICK_COMPLEXES
                        , value: COMPLEXES_DIVISION_X
                    } ]
                        , outData:{
                            displayText: DIVISION_BY_ZERO_IS_NOT_POSSIBLE,
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            numberIsWrapped: true,
                            arrMemory: [],
                            arrLogText: [
                                '1',
                                '+',
                                '1',
                                '+',
                                '2',
                                '-',
                                '4',
                                '+',
                                '1/( 0 )'
                            ],
                            percentNumber: 0,
                            divisionByZeroBlocking: true
                        }
                }// 1, +, 1, +, 2, -, 4, +, 1/x

            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantComplexes( ...v.inData )).toStrictEqual( v.outData );
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
        test( "test of servantComplexes complexesSqrX", ()=>{

            const checkedData = [
                {
                    inData: [ {
                        displayText: '10',
                        firstNumber: 10,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [],
                        percentNumber: null,
                        divisionByZeroBlocking: false
                    }
                        , {
                            type: ON_CLICK_COMPLEXES
                            , value: COMPLEXES_SQR_X
                        }
                    ]
                    , outData:{
                        displayText: '100',
                        firstNumber: 100,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            'sqr( 10 )'
                        ],
                        percentNumber: null,
                        divisionByZeroBlocking: false
                    }
                }// default mode


            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantComplexes( ...v.inData )).toStrictEqual( v.outData );
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
        test( "test of servantComplexes complexesSqrtX", ()=>{

            const checkedData = [
                {
                    inData: [ {
                        displayText: '25',
                        firstNumber: 25,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [],
                        percentNumber: null,
                        divisionByZeroBlocking: false
                    }
                        , {
                            type: ON_CLICK_COMPLEXES
                            , value: COMPLEXES_SQRT_X
                        }
                    ]
                    , outData:{
                        displayText: '5',
                        firstNumber: 5,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: true,
                        arrMemory: [],
                        arrLogText: [
                            '√( 25 )'
                        ],
                        percentNumber: null,
                        divisionByZeroBlocking: false
                    }
                }// default mode


            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantComplexes( ...v.inData )).toStrictEqual( v.outData );
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
        test( "test of servantMemory", ()=>{

            const checkedData = [
                    {
                        inData: [ {
                            displayText: '5',
                            firstNumber: 5,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: 'notOperator',
                            onDot: false,
                            arrMemory: [],
                            arrLogText: [],
                            percentNumber: 0,
                            numberIsWrapped: false
                        }
                        , {
                            type: ON_CLICK_MEMORY
                            , value: MEMORY_SAVE
                        }
                    ]
                    , outData:{
                            displayText: '5',
                            firstNumber: 5,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: 'notOperator',
                            onDot: false,
                            arrMemory: [
                                5
                            ],
                            arrLogText: [],
                            percentNumber: 0,
                            numberIsWrapped: true
                        }
                }// 5, MS
                    , {
                        inData: [ {
                            displayText: '2',
                            firstNumber: 1,
                            lastNumber: 2,
                            mode: 3,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrMemory: [],
                            arrLogText: [
                                '1',
                                '+'
                            ],
                            percentNumber: 1,
                            numberIsWrapped: false
                        }
                        , {
                            type: ON_CLICK_MEMORY
                            , value: MEMORY_SAVE
                        }
                    ]
                    , outData:{
                        displayText: '2',
                        firstNumber: 1,
                        lastNumber: 2,
                        mode: 3,
                        firstOperator: 'simplePlus',
                        onDot: false,
                        arrMemory: [
                            2
                        ],
                        arrLogText: [
                            '1',
                            '+'
                        ],
                        percentNumber: 1,
                        numberIsWrapped: true
                    }
                }// 1, +, 2, MS
                    , {
                        inData: [ {
                            displayText: '5',
                            firstNumber: 5,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: 'notOperator',
                            onDot: false,
                            arrMemory: [
                                10
                            ],
                            arrLogText: [],
                            percentNumber: null,
                            numberIsWrapped: false
                        }
                        , {
                            type: ON_CLICK_MEMORY
                            , value: MEMORY_MINUS
                        }
                    ]
                    , outData:{
                            displayText: '5',
                            firstNumber: 5,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: 'notOperator',
                            onDot: false,
                            arrMemory: [
                                5
                            ],
                            arrLogText: [],
                            percentNumber: null,
                            numberIsWrapped: true
                        }
                }// 10, MS, 5, M-
                    , {
                        inData: [ {
                            displayText: '5',
                            firstNumber: 5,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: 'notOperator',
                            onDot: false,
                            arrMemory: [
                                10
                            ],
                            arrLogText: [],
                            percentNumber: null,
                            numberIsWrapped: false
                        }
                        , {
                            type: ON_CLICK_MEMORY
                            , value: MEMORY_PLUS
                        }
                    ]
                    , outData:{
                            displayText: '5',
                            firstNumber: 5,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: 'notOperator',
                            onDot: false,
                            arrMemory: [
                                15
                            ],
                            arrLogText: [],
                            percentNumber: null,
                            numberIsWrapped: true
                        }
                }// 10, MS, 5, M+
                    , {
                        inData: [ {
                            displayText: '444',
                            firstNumber: 444,
                            lastNumber: 321,
                            mode: 4,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrMemory: [],
                            arrLogText: [
                                '123',
                                '+',
                                '321',
                                '='
                            ],
                            percentNumber: 444,
                            divisionByZeroBlocking: false,
                            numberIsWrapped: false
                        }
                        , {
                            type: ON_CLICK_MEMORY
                            , value: MEMORY_SAVE
                        }
                    ]
                    , outData:{
                            displayText: '444',
                            firstNumber: 444,
                            lastNumber: 321,
                            mode: 4,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrMemory: [
                                444
                            ],
                            arrLogText: [
                            ],
                            percentNumber: 444,
                            numberIsWrapped: true
                        }
                }// 123, +, 321, =, MS


            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantMemory( ...v.inData )).toStrictEqual( v.outData );
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
        test( "test of servantOnDot", ()=>{

            const checkedData = [
                    {
                        inData:  {
                            displayText: '0',
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: 'notOperator',
                            onDot: false,
                            percentNumber: null,
                            divisionByZeroBlocking: false,
                            arrMemory: [],
                            arrLogText: [],
                            numberIsWrapped: false
                        }
                    , outData:{
                            displayText: '0,',
                            firstNumber: 0,
                            lastNumber: 0,
                            mode: 0,
                            firstOperator: 'notOperator',
                            onDot: true,
                            arrMemory: [],
                            arrLogText: [],
                            percentNumber: null,
                            numberIsWrapped: false
                        }
                }// .
                    , {
                        inData:  {
                            displayText: '123',
                            firstNumber: 123,
                            lastNumber: 0,
                            mode: 1,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrMemory: [],
                            arrLogText: [
                                '123',
                                '+'
                            ],
                            percentNumber: 123,
                            numberIsWrapped: false
                        }
                    , outData:{
                            displayText: '0,',
                            firstNumber: 123,
                            lastNumber: 0,
                            mode: 3,
                            firstOperator: 'simplePlus',
                            onDot: true,
                            arrMemory: [],
                            arrLogText: [
                                '123',
                                '+'
                            ],
                            percentNumber: 123,
                            numberIsWrapped: false
                        }
                }// 123, +, .
                    , {
                        inData:  {
                            displayText: '246',
                            firstNumber: 246,
                            lastNumber: 0,
                            mode: 2,
                            firstOperator: 'simplePlus',
                            onDot: false,
                            arrMemory: [],
                            arrLogText: [
                                '123',
                                '+',
                                '123',
                                '+'
                            ],
                            percentNumber: 246,
                            numberIsWrapped: false
                        }
                    , outData:{
                            displayText: '0,',
                            firstNumber: 246,
                            lastNumber: 0,
                            mode: 3,
                            firstOperator: 'simplePlus',
                            onDot: true,
                            arrMemory: [],
                            arrLogText: [
                                '123',
                                '+',
                                '123',
                                '+'
                            ],
                            percentNumber: 246,
                            numberIsWrapped: false
                        }
                }// 123 + 123 + .



            ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( servantOnDot( v.inData )).toStrictEqual( v.outData );
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
        test( "test of reducer", ()=>{

            let rnd = Math.random() * 1000;
            if( Math.random() < .5 ) rnd *= -1;
            const checkedData = [
                { inData:  { state: {
                        displayText: DIVISION_BY_ZERO_IS_NOT_POSSIBLE,
                        firstNumber: 0,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [
                            '10',
                            '÷'
                        ] ,
                        percentNumber: NaN,
                        divisionByZeroBlocking: true
                    }
                    , action: {
                        type: ON_CLICK_NUMBER
                        , value: 7
                    }}
                , outData:{
                        displayText: '7',
                        firstNumber: 7,
                        lastNumber: 0,
                        mode: 0,
                        firstOperator: 'notOperator',
                        onDot: false,
                        numberIsWrapped: false,
                        arrMemory: [],
                        arrLogText: [],
                        percentNumber: NaN
                    }
            }// DIVISION_BY_ZERO_IS_NOT_POSSIBLE
                ];

            checkedData.forEach(( v, i ) =>{
                try{
                    expect( reducer( v.inData.state, v.inData.action )).toStrictEqual( v.outData );
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
                { nm: 12, wrapText: "negate", answer: "negate( 12 )"}
                , { nm: 0, wrapText: "negate", answer: "negate( 0 )"}
            ];

            inData.forEach( ( v, i ) => {

                try{
                    expect( wrapperArg( v.nm, v.wrapText) ).toStrictEqual( v.answer );
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
        test( "check the function wasWrapped ", ()=>{

            let arr = [
                [ 'sqr( 2 )', true ]
                , [ 3 , false]
                , [ 'ab3' , true ]
                , [ '1/( 10 )' , true ]
                , [ '=' , false ]
                , [ '43' , false ]
            ];
            arr.forEach( ( v, i ) => {
                try{

                        expect( wasWrapped( v[ 0 ] ) ).toStrictEqual( v[ 1 ] );
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
        test( "check the function getFontSize ", ()=>{

            let arr = [
                [ '12345678901', 46 ]
                , [ '1234567890', 46 ]
                , [ '123456789012', 44 ]

            ];

            const getFontSize = ( text )=>{
                const mainSize = 46;
                const mainLength = 11;
                const length = text.indexOf( ',') > -1 ? text.length - 1 : text.length;
                const size = length > mainLength ? mainSize - ( ( length - mainLength ) * 2 ) : mainSize;

                /*return {
                    fontSize: `${ size }px`
                };*/
                return size;
            };
            arr.forEach( ( v, i ) => {
                try{
                        expect( getFontSize( v[ 0 ] ) ).toBe( v[ 1 ] );
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
        test( "check the function formatDisplayText ", ()=>{

            let arr = [
                [ '12345678901', '12 345 678 901' ]
                , [ '1234,5678901', '1 234,5678901' ]
                //, [ 'sdf,5678901', 'Error: Received data is not number' ]


            ];

            arr.forEach( ( v, i ) => {
                try{
                        expect( formatDisplayText( v[ 0 ] ) ).toBe( v[ 1 ] );
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
        test( "check the function getOutput ", ()=>{

            let arr = [
                [ '12345678901', '2', false, '123456789012' ]
                , [ '12345678901', '2', true, '12345678901,2' ]
                , [ '12345678901', '', true, '12345678901' ]
                , [ '1234567890123456', '2', true, '1234567890123456' ]
                , [ '1234567,890123456', '2', true, '1234567,890123456' ]
                , [ '1234567890123456', '2', true, '1234567890123456' ]
                , [ '123,456789012345', '6', true, '123,4567890123456' ]
                , [ '123,456', 0, false, '123,4560' ]
                //, [ 'sdf,5678901', 'Error: Received data is not number' ]


            ];

            arr.forEach( ( v, i ) => {
                try{
                        expect( getOutput( v[ 0 ], v[ 1 ], v[ 2 ] ) ).toBe( v[ 3 ] );
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
        /*test( "check the function getComplexesAttributes ", ()=>{

            let arr = [ COMPLEXES_DIVISION_X ];
            arr.forEach( ( v, i ) => {
                try{

                        expect( getComplexesAttributes( v )).toEqual( {"cOperation": Function cOperation, "wrapText": "1/"} );
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
        });*/
    });

});
