import React from "react";
import {connect} from "react-redux";
import {
    MEMORY_CLEAR,
    MEMORY_LIST,
    MEMORY_MINUS,
    MEMORY_PLUS,
    MEMORY_READ,
    MEMORY_SAVE,
    ON_CLICK_MEMORY
} from "../../constants";

const MemoryBtns = ( {
                         onClick
                         , divisionByZeroBlocking
                        , memoryEngaged
                     } )=>{

    return(
        <fieldset className="input_fieldsets">
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || memoryEngaged }
                    onClick={ () => onClick( MEMORY_CLEAR )}
                    >MC</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || memoryEngaged }
                    onClick={ () => onClick( MEMORY_READ )}
                    >MR</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( MEMORY_PLUS)}
                    >M+</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( MEMORY_MINUS )}
                    >M-</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking }
                    onClick={ () => onClick( MEMORY_SAVE )}
                    >MS</button>
            <button className="mm_btns"
                    disabled={ divisionByZeroBlocking || memoryEngaged || true }
                    onClick={ () => onClick( MEMORY_LIST )}
                    >M<sup className="down_arrow">▼</sup></button>
        </fieldset>
    );

};


export default connect(
    state => {
        return ({
            divisionByZeroBlocking: state.divisionByZeroBlocking
            , memoryEngaged: !state.arrMemory.length
        });
    },
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_MEMORY, value: v })
        }
    })
)( MemoryBtns);
