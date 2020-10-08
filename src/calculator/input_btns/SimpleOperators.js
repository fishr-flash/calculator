import React from "react";
import {connect} from "react-redux";
import {ON_CLICK_SIMPLE_OPERATOR, SIMPLE_DIVISION, SIMPLE_MINUS, SIMPLE_MULTIPLY, SIMPLE_PLUS} from "../../constants";

const SimpleOperators = ( props )=>{

    return(
        <fieldset className="fieldset_simple_btns">
            <button className="input_btns btn_division" onClick={ () => props.onClick( SIMPLE_DIVISION )} />
            <button className="input_btns btn_multiply" onClick={ () => props.onClick( SIMPLE_MULTIPLY )} />
            <button className="input_btns btn_minus" onClick={ () => props.onClick( SIMPLE_MINUS )} />
            <button className="input_btns btn_plus" onClick={ () => props.onClick( SIMPLE_PLUS )} />
        </fieldset>
    );
};


export default connect(
    null,
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_SIMPLE_OPERATOR, value: v })
        }
    })
)( SimpleOperators);