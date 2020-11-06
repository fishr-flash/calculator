import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {formatDisplayText} from "../reducers/utils";
import {FONT_SIZE_OUTPUT_WINDOW, WIDTH_OUTPUT_WINDOW} from "../constants";

function Output( {
                     rawText
                    , logText
                 } ) {

    const displayText = formatDisplayText( rawText );
    const outputBlock = React.createRef();
    const [ rightOffset, setRightOffset ] = useState( 0 );
    const [ onManualShift, setOnManualShift ] = useState( false  );
    const [ logPWidth, setLogPWidth ] = useState( 0  );
    const [ logSpanWidth, setLogSpanWidth ] = useState( 0  );
    const [ arrowLeft, setArrowLeft ] = useState( null  );
    const [ arrowRight, setArrowRight ] = useState( null  );




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
        setArrowLeft(  outputBlock.current.children[ 0 ].firstChild );
        if( !arrowLeft ) return;
        setArrowRight( outputBlock.current.children[ 0 ].children[ 2 ] );
        if( !arrowRight ) return;
        const logSpan = outputBlock.current.children[ 0 ].children[ 1 ].firstChild;
        const logP = outputBlock.current.children[ 0 ].children[ 1 ];
        setLogPWidth(  outputBlock.current.parentNode.offsetWidth - arrowLeft.offsetWidth - arrowRight.offsetWidth - 4 );
        setLogSpanWidth( logSpan.offsetWidth );


        logP.style.width = `${ logPWidth }px`;

        if( !onManualShift && logSpanWidth > logPWidth ){
            arrowLeft.style.visibility = 'visible';
            if( onManualShift === false )setRightOffset( logSpanWidth - logPWidth );

        } else if( !onManualShift || logSpanWidth < logPWidth ) {
            logSpan.style.right = '0px';
            arrowRight.style.visibility = 'hidden';
            arrowLeft.style.visibility = 'hidden';
            setOnManualShift( false );
        }


    },[ setRightOffset
            , outputBlock
            , arrowLeft
            , arrowRight
            , logText
            , onManualShift
            , logSpanWidth
            , logPWidth
            , setLogSpanWidth
            , setLogPWidth ]);



    const clickArrow = ( dirRight )=>{

        const stepShift = 50;
        let rOffset = rightOffset + ( dirRight ? stepShift : -stepShift );

        if( rOffset <= 0 ){
            rOffset = 0;
            arrowLeft.style.visibility = 'hidden';

        } else {
            arrowLeft.style.visibility = 'visible';
        }

        if( rOffset + logPWidth >= logSpanWidth ){

            rOffset = logSpanWidth - logPWidth;
            arrowRight.style.visibility = 'hidden';
        } else {
            arrowRight.style.visibility = 'visible';
        }



        setRightOffset( rOffset );
        setOnManualShift( true );
    };

    return(
        <section className="full_width"  ref={ outputBlock }>
            <div className="full_width story_calc">
                <button
                        className="progress_arrows left_progress_arrow"
                        onClick={ ()=>clickArrow( 0 ) }
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