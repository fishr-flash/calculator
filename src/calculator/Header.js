import React from "react";

export default function Header(){
    return (
        <header>
            <div className="full_width" id="control_panel">
                <h1 className="label_ctrl_panel">Калькулятор</h1>
                <fieldset id="field_controls">
                    <button className="main_controls min_btn" disabled={true}/>
                    <button className="main_controls max_btn" disabled={true}/>
                    <button className="main_controls close_btn" disabled={true}/>
                </fieldset>
            </div>
            <div className="full_width" id="dashboard">
                <button className="subtitle_controls menu_btn" disabled={true}/>
                <h2 className="subitile_ordinary">Обычный</h2>
                <button className="subtitle_controls stick_btn" disabled={true}/>
                <button className="subtitle_controls journal_btn" disabled={true}/>
            </div>
        </header>
    );
}