import {ON_CLICK_PERCENT} from "../../constants";
import {connect} from "react-redux";
import React from "react";

const BtnPercent = ( {
                         onClick
                        , divisionByZeroBlocking
                     } )=>{
    return(
        <fieldset className="fieldset_percent">
            <button className="input_btns btn_percent"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( ) } >%</button>
        </fieldset>
    );
};


export default connect(
    state => {
        return ({
            divisionByZeroBlocking: state.divisionByZeroBlocking
        });
    },
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_PERCENT, value: null })
        }
    })
)( BtnPercent);