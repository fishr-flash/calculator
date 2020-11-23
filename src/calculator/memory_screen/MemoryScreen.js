import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    MEMORY_LIST_ON_CLOSE, NOTHING_IS_SAVED_IN_MEMORY,
    ON_CLICK_MEMORY_ELEMENT,
    ON_CLICK_MEMORY_LIST,
    ON_MEMORY_LIST_CLEAR
} from "../../constants";
import MemoryEntity from "./MemoryEntity";

function MemoryScreen({
                        onClick
                        , onClickElement
                        , memoryListOnOpen
                        , arrMemory
                      }){

    const CLOSE_MARGIN_TOP = '515px';
    const OPEN_MARGIN_TOP = '201px';

    const memList = arrMemory.map( ( v, i )=>{
       return  <MemoryEntity
                    onClickElement={ onClickElement }
                    value={ v }
                    key={ `em${i}` }
                    id={ i } />;
    });

    const mockOfBlankScreen = ( <p className={'full_width'}>{ NOTHING_IS_SAVED_IN_MEMORY}</p>);

    const onClickClose = ( e )=>{
        if( e.target.id === 'memory_screen'){
            onClick( MEMORY_LIST_ON_CLOSE )
        }
    };

    const onClickClearList = ()=>{
            onClick( ON_MEMORY_LIST_CLEAR );
    };

    const [ marginTop, setMarginTop ] = useState( CLOSE_MARGIN_TOP );

    useEffect( ()=>{
        if( memoryListOnOpen ) setMarginTop( OPEN_MARGIN_TOP );
        else setMarginTop( CLOSE_MARGIN_TOP );

    },[
        setMarginTop
        , memoryListOnOpen
    ]);

    ///TODO: Custom scrollbar https://habr.com/ru/company/2gis/blog/169359/
    return (
        <section
            style={{ visibility: memoryListOnOpen ? 'visible' : "hidden" }}
            className="full_width memory_screen"
            id={ 'memory_screen' }
            onClick={ onClickClose }
        >

            <div className="memory_field" style={{ marginTop: marginTop }}>
                <div className={'memory_list'}>
                    { arrMemory.length ? memList.reverse() : mockOfBlankScreen }
                </div>
                <div className="delete_memory_button_wrapper" >
                    <button
                            onClick={ onClickClearList }
                            style={{ visibility: arrMemory.length === 0 ? 'hidden' : 'visible'}  }
                            className="delete_memory_button"
                            title={'trash'}/>
                </div>

            </div>
        </section>
    );
}

export default connect(

    state => {
        return ({
            memoryListOnOpen: state.memoryListOnOpen
            , arrMemory: state.arrMemory
        });
    },
    dispatch => ({
        onClick: ( v ) => {
            dispatch( {type: ON_CLICK_MEMORY_LIST, value: v })
        }
        , onClickElement: ( v ) =>{
            dispatch( { type: ON_CLICK_MEMORY_ELEMENT, value: v })
        }

    })
)( MemoryScreen );