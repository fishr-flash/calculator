import React from "react";
import {connect} from "react-redux";
import {ON_CLICK_SIMPLE_OPERATOR, SIMPLE_DIVISION, SIMPLE_MINUS, SIMPLE_MULTIPLY, SIMPLE_PLUS} from "../../constants";

const SimpleOperators = ( {
                              onClick
                              , divisionByZeroBlocking
                          } )=>{

    return(
        <fieldset className="fieldset_simple_btns">
            <button className="input_btns btn_division"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( SIMPLE_DIVISION )} />
            <button className="input_btns btn_multiply"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( SIMPLE_MULTIPLY )} />
            <button className="input_btns btn_minus"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( SIMPLE_MINUS )} />
            <button className="input_btns btn_plus"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( SIMPLE_PLUS )} />
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
            dispatch( {type: ON_CLICK_SIMPLE_OPERATOR, value: v })
        }
    })
)( SimpleOperators);