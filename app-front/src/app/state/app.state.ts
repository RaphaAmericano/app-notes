import { NoteState } from '../pages/note/state/note.state';
import { UserState } from '../pages/profile/state/user.state';
import { LoginState } from '../pages/login/state/login.state';

export interface State {
    login: LoginState;
    // user:UserState;
    // notes:NoteState;
    // auth:any;
}