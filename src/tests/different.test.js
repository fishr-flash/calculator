import {toFloat} from "../reducers/utils";

describe( "all different", ()=>{
    describe( 'different', ()=>{
        test( "typeof of number", ()=>{
           //expect( typeof "-3" === "number").toBe( true );
           //expect( typeof "3,23" === "number").toBe( true );
           //expect( Number( "negate( 34 )")).toBe( 0 );
           //expect( Number( toFloat( "3,4" ))).toBe( 0 );

            /*
            const selectNumber = ( firstNumber, arrLogText ) =>{
                  if( typeof toFloat( arrLogText ) !== 'number'
                        && arrLogText.includes( toDisplayText( firstNumber )))
                  return arrLogText;

                  return firstNumber;

                };
             */
            //expect( typeof toFloat( "negate( 3,5 )")).toBe( 0 );
            //expect( toFloat( "negate( 3,5 )")).toBe( 0 );
            //expect( isNaN( toFloat( "negate( 3,5 )" ) ) ).toBe( 0 );
            //expect(  "negate( 3,5 )".includes( toDisplayText( 3.5 ) )  ).toBe( 0 );
            const a = NaN;
            expect(  isNaN( a )).toBe( true );
            expect(  a ).toBe( NaN );
        });
        test( "slice and splice", ()=>{

            expect(  [1, 2, 3, 4 ].splice( -1, 1 )).toStrictEqual( [ 4 ] );
            expect(  [1, 2, 3, 4 ].slice( 0, -1 )).toStrictEqual( [1, 2, 3] );
            expect(  [1, 2, 3, 4 ].slice( -1 )).toStrictEqual( [ 4 ] );

        });
        test( "how work the symbol %", ()=>{

            expect( 3%2 ).toBe( 1 );


        });

        test( "how work spread objects", ()=>{

            const obj = {
                a:1
                , b: 2
                , c: 3
                , d:{
                    e: 4
                    , f: 5
                }
            };

            const fn = ( { a, b, e })=> a + b + e;

            expect( fn( { ...obj, ...obj.d } ) ).toBe( 7 );
            expect( { ...obj, ...obj.d } ).toStrictEqual( {a:1, b:2, c:3, d:{ e:4, f: 5 }, e: 4, f: 5 } );
        });
        test( "how work isNaN", ()=>{

            const foo = '1/( 10 )';

            expect( toFloat( foo ) ).toBe( 1 );
            expect( isNaN( toFloat( foo ) ) ).toBe( false );
            expect( isNaN( foo ) ).toBe( true );
            expect( isNaN( '12.12' ) ).toBe( false );
            expect( isNaN( '12,12' ) ).toBe( true );
        });


    })
});
