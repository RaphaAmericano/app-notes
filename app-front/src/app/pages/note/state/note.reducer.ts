import { NoteState } from "./note.state";
import { NoteActions } from './note.actions';
import { NoteActionTypes } from './note.enum';

const initialState: NoteState = {
    currentNoteId:null,
    notes:[],
    error: ''
}

export function reducer(state = initialState, action:NoteActions): NoteState {
    switch(action.type){
        case NoteActionTypes.LoadSuccess:
            return {
                ...state,
                notes:action.payload
            };
        case NoteActionTypes.LoadFail:
            return {
                ...state,
                error:action.payload
            };
        default:
            return state;
    }
}