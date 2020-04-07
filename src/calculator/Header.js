import React from "react";

export default function Header(){
    return (
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
                <h2 id="subtitle_ordinary">Обычный</h2>
                <button className="subtitle_controls" id="stick_btn"/>
                <button className="subtitle_controls" id="journal_btn"/>
            </div>
        </header>
    );
}