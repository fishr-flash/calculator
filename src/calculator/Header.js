import React from "react";

export default function Header(){
    return (
        <header>
            <div className="full_width" id="control_panel">
                <h1 id="label_ctrl_panel">Калькулятор</h1>
                <fieldset id="field_controls">
                    <button className="main_controls" id="min_btn" disabled={true}/>
                    <button className="main_controls" id="max_btn" disabled={true}/>
                    <button className="main_controls" id="close_btn" disabled={true}/>
                </fieldset>
            </div>
            <div className="full_width" id="dashboard">
                <button className="subtitle_controls" id="menu_btn" disabled={true}/>
                <h2 id="subtitle_ordinary">Обычный</h2>
                <button className="subtitle_controls" id="stick_btn" disabled={true}/>
                <button className="subtitle_controls" id="journal_btn" disabled={true}/>
            </div>
        </header>
    );
}