import React from "react";
import {connect} from "react-redux";
import Input from "./Input";
import {formatDisplayText} from "../reducers/utils";

function Output( {
                     rawText
                    , logText
                 } ) {

    const displayText = formatDisplayText( rawText );

    const getFontSize = ( text )=>{
        const reductionStep = 3.5;
        const mainSize = 50;
        const mainLength = 9;
        const length = text.indexOf( ',') > -1 ? text.length - 1 : text.length;
        const size = length > mainLength ? mainSize - ( ( length - mainLength ) * reductionStep ) : mainSize;

        return {
            fontSize: `${ size }px`
        };
    };


    const classProgressContent = 'progress_content';
    return(
        <section className="full_width">
            <div className="full_width story_calc">
                <button className="progress_arrows left_progress_arrow"/>
                <p className={ `${ classProgressContent}` } >{ logText }</p>
                <button className="progress_arrows right_progress_arrow" />
            </div>
            <div className="full_width viewer_panel" id="viewer">
                <blockquote>
                    <input type={'text'}
                           maxLength={ 22 }
                           name={'inputWindow'}
                           style={ getFontSize( rawText ) }
                           className='inputWindow'
                           value={ displayText }
                    />
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