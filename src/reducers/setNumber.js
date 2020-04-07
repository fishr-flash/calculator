import {ON_CLICK_NUMBER} from "../constants";


export default function ( state = '0', action ) {

        switch ( action.type ) {

        case ON_CLICK_NUMBER:
            state = `${state === '0' || undefined ? "" : state }${action.value}`;
            break;
        default:


    }

        return  state;

}