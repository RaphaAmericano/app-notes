import { User } from 'src/app/shared/models/user';

export interface UserState {
    user:User;
    error:string;
}