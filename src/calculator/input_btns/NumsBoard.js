import React from "react";
import {connect} from "react-redux";
import {ON_CLICK_DOT, ON_CLICK_NUMBER, ON_CLICK_SIGN} from "../../constants";

const NumsBoard = ( {
                        clickNumber
                        , clickSymbol
                        , divisionByZeroBlocking
                    } )=>{

    return(
        <fieldset className="fieldset_num_btns">
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 7 )}>7</button>
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 8 )}>8</button>
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 9 )}>9</button>
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 4 )}>4</button>
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 5 )}>5</button>
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 6 )}>6</button>
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 1 )}>1</button>
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 2 )}>2</button>
            <button className="input_btns nmr_btns" onClick={ () =>clickNumber( 3 )}>3</button>
            <button className="input_btns nmr_btns btn_plus_minus"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () =>clickSymbol( )}/>
            <button className="input_btns nmr_btns" id="btn_zerro" onClick={ () =>clickNumber( 0 )}>0</button>
            <button className="input_btns nmr_btns" id="btn_dote"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => clickSymbol( "." )}>,</button>
        </fieldset>
    );

}

export default connect(
    state => {
        return ({
            divisionByZeroBlocking: state.divisionByZeroBlocking
        });
    },
    dispatch => ({
        clickNumber: ( v ) => {
            dispatch( {type: ON_CLICK_NUMBER, value: v })
        }
        , clickSymbol: ( arg ) => {
            arg ? dispatch( {type: ON_CLICK_DOT })
                : dispatch( {type: ON_CLICK_SIGN })
        }
    })
)( NumsBoard );