import {ON_CLICK_SIMPLE_OPERATOR, SIMPLE_RESULT} from "../../constants";
import {connect} from "react-redux";
import React from "react";

const BtnPercent = ( props )=>{

    return(
        <fieldset id="fieldset_percent">
            <button className="input_btns" id="btn_percent">%</button>
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