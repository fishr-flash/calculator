import React, {useState} from "react";

function MemoryEntity() {



    const [ butsVisible, setButsVisible ] = useState( 'hidden' );

    return(

        <div className={'memory_entity'}
             onMouseOver={( )=>setButsVisible( 'visible' ) } 
             onMouseOut={( )=>setButsVisible( 'hidden' ) } >
            <p className={'outputWindow memoryP'}>225</p>
            <div className={'memory_list_buttons'} style={{ visibility: butsVisible }}>
                <button className={'memory_list_one_button'}>MC</button>
                <button className={'memory_list_one_button'}>M+</button>
                <button className={'memory_list_one_button'}>M-</button>
            </div>
        </div>
    );
}

export default MemoryEntity;