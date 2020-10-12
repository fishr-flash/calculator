import {ON_CLICK_PERCENT} from "../../constants";
import {connect} from "react-redux";
import React from "react";

const BtnPercent = ( props )=>{

    return(
        <fieldset className="fieldset_percent">
            <button className="input_btns btn_percent" onClick={ () => props.onClick( ) } >%</button>
        </fieldset>
    );
};


export default connect(
    null,
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_PERCENT, value: null })
        }
    })
)( BtnPercent);