import React, {useEffect} from "react";
import {connect} from "react-redux";
import {formatDisplayText} from "../reducers/utils";
import {FONT_SIZE_OUTPUT_WINDOW, WIDTH_OUTPUT_WINDOW} from "../constants";

function Output( {
                     rawText
                    , logText
                 } ) {

    const displayText = formatDisplayText( rawText );
    const spanOutputWindow = React.createRef();
    const classProgressContent = 'progress_content';

        useEffect( ()=>{

            const outputSpan = spanOutputWindow.current;
            const parentP = spanOutputWindow.current.parentNode;
            if( outputSpan.offsetWidth > WIDTH_OUTPUT_WINDOW ){
                const fontSize  = parentP.style.fontSize.substr(0,2);
                const nextSize = Math.ceil(fontSize * ( WIDTH_OUTPUT_WINDOW / outputSpan.offsetWidth ) );
                parentP.style.fontSize = `${ nextSize }px`;

            } else if( outputSpan.textContent.length > 10 && outputSpan.offsetWidth < WIDTH_OUTPUT_WINDOW){
                const fontSize  = parentP.style.fontSize.substr(0,2);
                const nextSize = Math.ceil(fontSize / ( outputSpan.offsetWidth / WIDTH_OUTPUT_WINDOW  ) );
                parentP.style.fontSize = `${ nextSize < FONT_SIZE_OUTPUT_WINDOW ? nextSize : FONT_SIZE_OUTPUT_WINDOW}px`;
            } else if( outputSpan.textContent.length < 10 ){
                parentP.style.fontSize = `${ FONT_SIZE_OUTPUT_WINDOW }px`;
            }
        });

    return(
        <section className="full_width">
            <div className="full_width story_calc">
                <button className="progress_arrows left_progress_arrow"/>
                <p className={ `${ classProgressContent}` } >{ logText }</p>
                <button className="progress_arrows right_progress_arrow" />
            </div>
            <div className="full_width viewer_panel" id="viewer">
                <blockquote>
                        <p type={'text'}
                           className='outputWindow'
                        ><span id={'spanOutputWindow'} ref={ spanOutputWindow }>{ displayText }</span></p>
                </blockquote>
            </div>
        </section>
    );
}

export default connect(
    
    state => {
        return ({
                rawText: state.displayText
                , logText: state.arrLogText.join( ' ' )

        });
    }, null
)( Output );