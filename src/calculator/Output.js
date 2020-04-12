import React from "react";
import {connect} from "react-redux";

function Output( props ) {

    return(
        <section className="full_width" id="output">
            <div className="full_width" id="progress">
                <button className="progress_arrows" id="left_progress_arrow"/>
                <p id="progress_content">{ props.history }</p>
                <button className="progress_arrows" id="right_progress_arrow"/>
            </div>
            <div className="full_width" id="viewer">
                <blockquote>
                    <p id="viewport">{props.output}</p>
                </blockquote>
            </div>
        </section>
    );
}

export default connect(
    
    state => {
        return ({
                output: state.output
                , history: state.history
        });
    }, null
)( Output );