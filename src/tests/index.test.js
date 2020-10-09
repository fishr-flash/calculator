import servantResult from "../reducers/servants/servantResult";
import {MODES, SIMPLE_PLUS} from "../constants";
import {flatDeep} from "../reducers/utils";

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
