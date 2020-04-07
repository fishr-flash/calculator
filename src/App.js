import React from 'react';
//import './css/App.css';


function App() {
  return (
            <main role="main" className={"App"}>
            <header>
                <div className="full_width" id="control_panel">
                    <h1 id="label_ctrl_panel">Калькулятор</h1>
                    <fieldset id="field_controls">
                        <button className="main_controls" id="min_btn"/>
                        <button className="main_controls" id="max_btn"/>
                        <button className="main_controls" id="close_btn"/>
                    </fieldset>
                </div>
                <div className="full_width" id="dashboard">
                    <button className="subtitle_controls" id="menu_btn"/>
                    <h2 id="subitile_ordinary">Обычный</h2>
                    <button className="subtitle_controls" id="stick_btn"/>
                    <button className="subtitle_controls" id="journal_btn"/>
                </div>
            </header>
            <section className="full_width" id="output">
                <div className="full_width" id="progress">
                    <button className="progress_arrows" id="left_progress_arrow"/>
                    <p id="progress_content">512342457+4568+512+123</p>
                    <button className="progress_arrows" id="right_progress_arrow"/>
                </div>
                <div className="full_width" id="viewer">
                    <blockquote>
                        <p id="viewport">2 087 746 752</p>
                    </blockquote>
                </div>
            </section>
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
                    <fieldset id="fieldset_num_btns">
                        <button className="input_btns nmr_btns" id="btn_seven">7</button>
                        <button className="input_btns nmr_btns" id="btn_eath">8</button>
                        <button className="input_btns nmr_btns" id="btn_nine">9</button>
                        <button className="input_btns nmr_btns" id="btn_four">4</button>
                        <button className="input_btns nmr_btns" id="btn_five">5</button>
                        <button className="input_btns nmr_btns" id="btn_six">6</button>
                        <button className="input_btns nmr_btns" id="btn_one">1</button>
                        <button className="input_btns nmr_btns" id="btn_two">2</button>
                        <button className="input_btns nmr_btns" id="btn_three">3</button>
                        <button className="input_btns nmr_btns" id="btn_plus_minus"/>
                        <button className="input_btns nmr_btns" id="btn_zerro">0</button>
                        <button className="input_btns nmr_btns" id="btn_dote">,</button>
                    </fieldset>
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
        </main>

  );
}

export default App;
