import {ON_CLICK_SIMPLE_OPERATOR, SIMPLE_RESULT} from "../../constants";
import {connect} from "react-redux";
import React from "react";

const BtnResult = ( props )=>{

    return(
        < fieldset >
            <button className="input_btns" id="btn_result" onClick={ () => props.onClick( SIMPLE_RESULT )} />
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
)( BtnResult);