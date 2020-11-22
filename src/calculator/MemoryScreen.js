import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {MEMORY_LIST_ON_CLOSE, ON_CLICK_MEMORY_LIST} from "../constants";

function MemoryScreen({
                        onClick,
                        memoryListOnOpen
                      }){

    const CLOSE_MARGIN_TOP = '515px';
    const OPEN_MARGIN_TOP = '199px';

    const onClickClose = ( e )=>{
        if( e.target.id === 'memory_screen'){
            onClick( MEMORY_LIST_ON_CLOSE )
        }
    };

    const [ marginTop, setMarginTop ] = useState( CLOSE_MARGIN_TOP );

    useEffect( ()=>{
        if( memoryListOnOpen ) setMarginTop( OPEN_MARGIN_TOP );
        else setMarginTop( CLOSE_MARGIN_TOP );

    },[
        setMarginTop
        , memoryListOnOpen
    ]);

    
    return (
        <section
            style={{ visibility: memoryListOnOpen ? 'visible' : "hidden" }}
            className="full_width memory_screen"
            id={ 'memory_screen' }
            onClick={ onClickClose }
        >

            <div className="memory_list" style={{ marginTop: marginTop }}>
                <div className="delete_memory_button_wrapper" >
                    <button className="delete_memory_button" title={'trash'}/>
                </div>

            </div>
        </section>
    );
}

export default connect(

    state => {
        return ({
            memoryListOnOpen: state.memoryListOnOpen

        });
    },
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_MEMORY_LIST, value: v })
        }
    })
)( MemoryScreen );