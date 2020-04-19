import { Note } from 'src/app/shared/models/note';

export interface NoteState {
    currentNoteId:number;
    notes:Note[],
    error: string
}