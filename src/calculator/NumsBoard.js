import React from "react";
import {connect} from "react-redux";
import {ON_CLICK_NUMBER} from "../constants";

const NumsBoard = ( props ) => {

    return(
        <fieldset id="fieldset_num_btns">
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 7 )}>7</button>
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 8 )}>8</button>
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 9 )}>9</button>
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 4 )}>4</button>
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 5 )}>5</button>
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 6 )}>6</button>
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 1 )}>1</button>
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 2 )}>2</button>
            <button className="input_btns nmr_btns" onClick={ () => props.clickNumber( 3 )}>3</button>
            <button className="input_btns nmr_btns" id="btn_plus_minus" onClick={ () => props.clickSymbol( "" )}/>
            <button className="input_btns nmr_btns" id="btn_zerro" onClick={ () => props.clickNumber( 0 )}>0</button>
            <button className="input_btns nmr_btns" id="btn_dote" onClick={ () => props.clickSymbol( "." )}>,</button>
        </fieldset>
    );

}

export default connect(
    state => ({
        tracks: state.tracks
    }),
    dispatch => ({
        clickNumber: ( v ) => {
            dispatch( {type: ON_CLICK_NUMBER, value: v })
        }
        , clickSymbol: (  ) => {
            dispatch( {type: ON_CLICK_NUMBER, value: 9 })
        }
        , onAddTrack: (trackName) => {
            dispatch({ type: 'ADD_TRACK', payload: trackName });
        }
    })
)( NumsBoard );