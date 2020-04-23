import React from "react";
import {connect} from "react-redux";
import {COMPLEXES_DIVISION_X, ON_CLICK_COMPLEXES} from "../../constants";

const ComplexesBtns = ( props )=>{

    return(
        <fieldset id="fieldset_complexes_btns">
            <button className="input_btns" id="btn_one_x" onClick={ () => props.onClick( COMPLEXES_DIVISION_X )} />
            <button className="input_btns" id="btn_x2" />
            <button className="input_btns" id="btn_2x" />
        </fieldset>
    );
};


export default connect(
    null,
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_COMPLEXES, value: v })
        }
    })
)( ComplexesBtns);