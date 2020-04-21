import React from "react";
import NumsBoard from "./input_btns/NumsBoard";
import SimpleOperators from "./input_btns/SimpleOperators";
import BtnResult from "./input_btns/BtnResult";
import BtnPercent from "./input_btns/BtnPercent";
import MainBtns from "./input_btns/MainBtns";
import MemoryBtns from "./input_btns/MemoryBtns";
import ComplexesBtns from "./input_btns/ComplexesBtns";

const Input = () => {
    return(
        <section className="full_width" id="input">
            <MemoryBtns/>
            <section className="input_fieldsets">
                <BtnPercent/>
                <MainBtns />
                <ComplexesBtns/>
                <NumsBoard />
                <SimpleOperators />
                <BtnResult/>
            </section>
        </section>
    );

};

export default Input;
