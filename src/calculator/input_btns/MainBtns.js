import React from "react";

const MainBtns = ( props ) =>{

    return(
        <fieldset id="main_btns">
            <button className="input_btns" id="btn_ce">CE</button>
            <button className="input_btns" id="btn_c">C</button>
            <button className="input_btns" id="btn_remove" />
        </fieldset>
    );

};

export default MainBtns;