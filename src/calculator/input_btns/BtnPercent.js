import {ON_CLICK_SIMPLE_OPERATOR} from "../../constants";
import {connect} from "react-redux";
import React from "react";

const BtnPercent = ( props )=>{

    return(
        <fieldset className="fieldset_percent">
            <button className="input_btns btn_percent" disabled={true} >%</button>
        </fieldset>
    );
}


export default connect(
    null,
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_SIMPLE_OPERATOR, value: v })
        }
    })
)( BtnPercent);