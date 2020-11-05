import React, {useEffect} from "react";
import {connect} from "react-redux";
import {formatDisplayText} from "../reducers/utils";
import {BIG_LENGTH_LOG_TEXT, FONT_SIZE_OUTPUT_WINDOW, WIDTH_OUTPUT_WINDOW} from "../constants";

function Output( {
                     rawText
                    , logText
                 } ) {

    const displayText = formatDisplayText( rawText );
    const outputBlock = React.createRef();

    useEffect( ()=>{

        /// for resize font of output displayText
        const outputSpan = outputBlock.current.children[ 1 ].firstChild.firstChild.firstChild;
        const parentP = outputBlock.current.children[ 1 ].firstChild.firstChild;

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


        /// show/hide the control arrows to position the text variable logText

        const arrowLeft = outputBlock.current.children[ 0 ].firstChild;
        const arrowRight = outputBlock.current.children[ 0 ].children[ 2 ];
        const logSpan = outputBlock.current.children[ 0 ].children[ 1 ].firstChild;
        const logP = outputBlock.current.children[ 0 ].children[ 1 ];
        const logPWidth = outputBlock.current.parentNode.offsetWidth - arrowLeft.offsetWidth - arrowRight.offsetWidth - 4;
        logP.style.width = `${ logPWidth }px`;


        if( logText.length >= BIG_LENGTH_LOG_TEXT ){
            arrowRight.style.visibility = 'visible';
            arrowLeft.style.visibility = 'visible';

            logSpan.style.right = `${ logSpan.offsetWidth - logPWidth }px`;
        } else {
            logSpan.style.right = '0px';
            logSpan.style.left = '0px';
            arrowRight.style.visibility = 'hidden';
            arrowLeft.style.visibility = 'hidden';
        }



        /////////////////////////////CONSOLE/////////////////////////////////////
            ///TODO: Console log in the code "OUTPUT_JS" line 44
            if( true ){
                console.group( 'Console log in the code "OUTPUT_JS" line 44' );
                console.info( 'leftArrow: ', arrowLeft );
                console.info( 'leftArrow: ', arrowLeft.offsetWidth );
                console.info( 'rightArrow: ', arrowRight );
                console.info( 'logSpan: ', logSpan );
                console.info( 'logSpan: ', logSpan.offsetWidth );
                console.info( 'logP: ', logP );
                console.info( 'logP: ', logP.getBoundingClientRect() );
                console.info( 'logP: ', logP.offsetWidth );
                console.info( 'outputBlock.current.parent.width: ', outputBlock.current.parentNode );
                console.info( 'outputBlock.current.parent.width: ', outputBlock.current.parentNode.getBoundingClientRect() );
                console.info( 'outputBlock.current.parent.width: ', outputBlock.current.parentNode.offsetWidth );
                console.info( 'logPWidth: ', logPWidth );
                console.info( 'this: ', this );
                //console.table( this );
                console.groupEnd();
            }
        /////////////////////////////END CONSOLE/////////////////////////////////
    });

    return(
        <section className="full_width"  ref={ outputBlock }>
            <div className="full_width story_calc">
                <button
                        className="progress_arrows left_progress_arrow"/>
                <p className={ 'progress_content' } >
                    <span className={ 'span_log_text' } style={{ textAlign: 'left'}} >
                        { logText }
                    </span>
                </p>
                <button
                        className="progress_arrows right_progress_arrow" />
            </div>
            <div className="full_width viewer_panel" id="viewer">
                <blockquote>
                        <p className='outputWindow' >
                            <span>
                                { displayText }
                            </span>
                        </p>
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