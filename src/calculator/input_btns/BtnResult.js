import {ON_CLICK_RESULT} from "../../constants";
import {connect} from "react-redux";
import React from "react";

const BtnResult = ( props )=>{

    return(
        < fieldset >
            <button className="input_btns btn_result" onClick={ () => props.onClick( )} />
        </fieldset>
    );
}


export default connect(
    null,
    dispatch => ({
        onClick: ( ) => {
            dispatch( {type: ON_CLICK_RESULT })
        }
    })
)( BtnResult);