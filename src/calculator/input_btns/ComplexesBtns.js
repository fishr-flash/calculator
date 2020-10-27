import React from "react";
import {connect} from "react-redux";
import {COMPLEXES_DIVISION_X, COMPLEXES_SQR_X, COMPLEXES_SQRT_X, ON_CLICK_COMPLEXES} from "../../constants";

const ComplexesBtns = ( {
                            onClick
                            , divisionByZeroBlocking
                        } )=>{

    return(
        <fieldset className="fieldset_complexes_btns" disabled={ false }>
            <button className="input_btns btn_one_x"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( COMPLEXES_DIVISION_X )} />
            <button className="input_btns btn_x2"
                    disabled={ divisionByZeroBlocking  }
                    onClick={ () => onClick( COMPLEXES_SQR_X )} />
            <button className="input_btns btn_2x"
                    disabled={ divisionByZeroBlocking  }
                    onClick={ () => onClick( COMPLEXES_SQRT_X )} />
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
            dispatch( {type: ON_CLICK_COMPLEXES, value: v })
        }
    })
)( ComplexesBtns);