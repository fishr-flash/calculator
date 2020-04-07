import React from "react";
import {connect} from "react-redux";
import {ON_CLICK_NUMBER} from "../constants";
import NumsBoard from "./NumsBoard";

const Input = () => {



    return(
        <section className="full_width" id="input">
            <fieldset className="input_fieldsets">
                <button className="mm_btns">MC</button>
                <button className="mm_btns">MR</button>
                <button className="mm_btns">M+</button>
                <button className="mm_btns">M-</button>
                <button className="mm_btns">MS</button>
                <button className="mm_btns">M<sup id="down_arrow">▼</sup></button>
            </fieldset>
            <section className="input_fieldsets">
                <fieldset id="fieldset_complexes_btns">
                    <button className="input_btns" id="btn_percent">
                        %
                    </button>
                    <button className="input_btns" id="btn_ce">CE</button>
                    <button className="input_btns" id="btn_c">C</button>
                    <button className="input_btns" id="btn_one_x"/>
                    <button className="input_btns" id="btn_x2"/>
                    <button className="input_btns" id="btn_2x"/>
                </fieldset>

                <NumsBoard />
                {/*<fieldset id="fieldset_num_btns">*/}
                {/*    <button className="input_btns nmr_btns" id="btn_seven">7</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_eath">8</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_nine">9</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_four">4</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_five">5</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_six">6</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_one">1</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_two">2</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_three">3</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_plus_minus"/>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_zerro">0</button>*/}
                {/*    <button className="input_btns nmr_btns" id="btn_dote">,</button>*/}
                {/*</fieldset>*/}
                <fieldset id="fieldset_simple_btns">
                    <button className="input_btns" id="btn_remove"/>
                    <button className="input_btns" id="btn_division"/>
                    <button className="input_btns" id="btn_multiply"/>
                    <button className="input_btns" id="btn_minus"/>
                    <button className="input_btns" id="btn_plus"/>
                    <button className="input_btns" id="btn_result"/>
                </fieldset>
            </section>
        </section>
    );

}

export default Input