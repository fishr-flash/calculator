import React from "react";

const MemoryBtns = ( props ) =>{

    return(
        <fieldset className="input_fieldsets">
            <button className="mm_btns">MC</button>
            <button className="mm_btns">MR</button>
            <button className="mm_btns">M+</button>
            <button className="mm_btns">M-</button>
            <button className="mm_btns">MS</button>
            <button className="mm_btns ">M<sup className="down_arrow">▼</sup></button>
        </fieldset>
    );

};


export default MemoryBtns;
