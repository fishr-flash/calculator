import React from "react";
import {connect} from "react-redux";
import {MAIN_BACKSPACE, MAIN_CLEAR, MAIN_CLEAR_END, ON_CLICK_MAIN} from "../../constants";

const MainBtns = ( props ) =>{

    return(
        <fieldset className="main_btns">
            <button className="input_btns" onClick={ () => props.onClick( MAIN_CLEAR_END ) }>CE</button>
            <button className="input_btns" onClick={ () => props.onClick( MAIN_CLEAR ) } >C</button>
            <button className="input_btns btn_backspace"  onClick={ () => props.onClick( MAIN_BACKSPACE ) } />
        </fieldset>
    );

};

export default connect(
    null,
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_MAIN, value: v })
        }
    })
)( MainBtns);