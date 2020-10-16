import React from "react";
import {connect} from "react-redux";
import {ON_CLICK_COMPLEXES} from "../../constants";

const MemoryBtns = ( {
                         onClick
                         , divisionByZeroBlocking
                     } )=>{

    return(
        <fieldset className="input_fieldsets">
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || true }>MC</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || true }>MR</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || true }>M+</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || true }>M-</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || true }>MS</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || true }>M<sup className="down_arrow">▼</sup></button>
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
)( MemoryBtns);
