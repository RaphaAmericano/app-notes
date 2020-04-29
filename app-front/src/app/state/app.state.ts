import { NoteState } from '../pages/note/state/note.state';
import { UserState } from '../pages/profile/state/user.state';

export interface State {
    user:UserState;
    notes:NoteState;
    auth:any;
}