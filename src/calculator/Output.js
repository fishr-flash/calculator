import React from "react";

export default function Output() {
    return(
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
    );
}