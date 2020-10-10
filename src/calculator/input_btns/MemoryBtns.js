import React from "react";

const MemoryBtns = ( props ) =>{

    return(
        <fieldset className="input_fieldsets">
            <button className="mm_btns" disabled={ true }>MC</button>
            <button className="mm_btns" disabled={ true }>MR</button>
            <button className="mm_btns" disabled={ true }>M+</button>
            <button className="mm_btns" disabled={ true }>M-</button>
            <button className="mm_btns" disabled={ true }>MS</button>
            <button className="mm_btns" disabled={ true }>M<sup className="down_arrow">▼</sup></button>
        </fieldset>
    );

};


export default MemoryBtns;
