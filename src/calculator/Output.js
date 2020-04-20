import React from "react";
import {connect} from "react-redux";

function Output( props ) {

    const formatDisplayText = ( displayText )=>{

        const parts = displayText.split( ',');
        let onMinus = false;

        if( parseInt( parts[ 0 ] ) < 0 ){
            onMinus = true;
            parts[ 0 ] = parts[ 0 ].slice( 1 );
        }


        const len = parts[ 0 ].length;
        let abs = "";

        for (let i = len -1; i >= 0; i--) {
            abs += ( len - i )%3?parts[ 0 ][ i ]: `${ parts[ 0 ][ i ] } `;
        }

        const invert = abs.split('').reverse();
        parts[ 0 ] = invert.join('').trim();

        return `${ onMinus? "-": ''}${parts.join(",")}`;
    };

    return(
        <section className="full_width" id="output">
            <div className="full_width" id="progress">
                <button className="progress_arrows" id="left_progress_arrow"/>
                <p id="progress_content">{ props.logText }</p>
                <button className="progress_arrows" id="right_progress_arrow"/>
            </div>
            <div className="full_width" id="viewer">
                <blockquote>
                    <p id="viewport">{formatDisplayText( props.displayText )}</p>
                </blockquote>
            </div>
        </section>
    );
}

export default connect(
    
    state => {
        return ({
                displayText: state.displayText
                , logText: state.arrLogText.join( ' ' )

        });
    }, null
)( Output );