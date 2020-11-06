import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import {formatDisplayText} from "../reducers/utils";
import {BIG_LENGTH_LOG_TEXT, FONT_SIZE_OUTPUT_WINDOW, WIDTH_OUTPUT_WINDOW} from "../constants";

function Output( {
                     rawText
                    , logText
                 } ) {

    const displayText = formatDisplayText( rawText );
    const outputBlock = React.createRef();
    const [ rightOffset, setRightOffset ] = useState( 0 );
    const [ onManualShift, setOnManualShift ] = useState( false  );

    const clickArrow = ( dirRight, logPWidth, rightOffset )=>{
        /////////////////////////////CONSOLE/////////////////////////////////////
        ///TODO: Console log in the code "OUTPUT_JS" line 84
        if( true ){
            console.group( 'Console log in the code "OUTPUT_JS" line 84' );
            console.info( 'this: ', dirRight );
            console.info( 'rightOffset: ', rightOffset );
            console.info( 'logPWidth: ', logPWidth );
            console.info( 'this: ', this );
            //console.table( this );
            console.groupEnd();
        }
        /////////////////////////////END CONSOLE/////////////////////////////////
        setRightOffset( rightOffset + ( dirRight ? 100 : -100 ) );
        setOnManualShift( true );

    };

    const onClickArrow = useCallback( ( dirRight, logPWidth, rightOffset )=>clickArrow( dirRight, logPWidth, rightOffset ), [ ])
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

        arrowLeft.onclick = ( e )=>{

            onClickArrow( 0, logPWidth, rightOffset );
        };
        
        
        /////////////////////////////CONSOLE/////////////////////////////////////
            ///TODO: Console log in the code "OUTPUT_JS" line 60
            if( true ){
                console.group( 'Console log in the code "OUTPUT_JS" line 60' );
                console.info( 'arrowLeft.onClick: ', arrowLeft.onClick );
                console.info( 'this: ', this );
                //console.table( this );
                console.groupEnd();
            }
        /////////////////////////////END CONSOLE/////////////////////////////////
        logP.style.width = `${ logPWidth }px`;

        if( logText.length >= BIG_LENGTH_LOG_TEXT ){
            arrowRight.style.visibility = 'visible';
            arrowLeft.style.visibility = 'visible';

            if( onManualShift === false )setRightOffset( logSpan.offsetWidth - logPWidth );

            //logSpan.style.right = `${ rightOffset }px`;
        } else {
            logSpan.style.right = '0px';
            logSpan.style.left = '0px';
            arrowRight.style.visibility = 'hidden';
            arrowLeft.style.visibility = 'hidden';
        }
    },[ setRightOffset, outputBlock, logText, onManualShift, onClickArrow ]);




    return(
        <section className="full_width"  ref={ outputBlock }>
            <div className="full_width story_calc">
                <button
                        className="progress_arrows left_progress_arrow"
                        /*onClick={ ()=>clickArrow( 0 ) }*/
                />
                <p className={ 'progress_content' } >
                    <span className={ 'span_log_text' } style={{ textAlign: 'left', right: rightOffset}} >
                        { logText }
                    </span>
                </p>
                <button
                        className="progress_arrows right_progress_arrow"
                        onClick={ ()=>clickArrow( 1 ) }
                />
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