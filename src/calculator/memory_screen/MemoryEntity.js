import React, {useState} from "react";
import {MEMORY_ELEMENT_CLEAR, MEMORY_ELEMENT_MINUS, MEMORY_ELEMENT_PLUS} from "../../constants";
import {formatDisplayText, toDisplayText} from "../../reducers/utils";

function MemoryEntity( {
                           onClickElement
                        , value
                        , id
                       } ) {

    const [ butsVisible, setButsVisible ] = useState( 'hidden' );
    const ids = [ 'MC', 'M+', 'M-'];


    const onClickBtn = ( e )=>{
        switch ( e.target.id ) {
            case ids[ 0 ]:
                onClickElement( { die: MEMORY_ELEMENT_CLEAR, id: id });
                break;
            case ids[ 1 ]:
                onClickElement( { die: MEMORY_ELEMENT_PLUS, id: id });
                break;
            case ids[ 2 ]:
                onClickElement( { die: MEMORY_ELEMENT_MINUS, id: id });
                break;

            default:
                throw new Error( 'Received unknown id ');

        }
    };

    const buttons = ids.map( ( v )=>{
        return ( <button className={'memory_list_one_button'}
                         id={v}
                         key={ `btn${ v }`}
                         onClick={ onClickBtn }>{ v }</button> );
    });
    return(

        <div className={'memory_entity'}
             onMouseOver={( )=>setButsVisible( 'visible' ) } 
             onMouseOut={( )=>setButsVisible( 'hidden' ) } >
            <p className={'outputWindow memoryP'}>{ formatDisplayText( toDisplayText( value ) ) }</p>
            <div className={'memory_list_buttons'} style={{ visibility: butsVisible }}>
                { buttons }
            </div>
        </div>
    );
}

export default MemoryEntity;