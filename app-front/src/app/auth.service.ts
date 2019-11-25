import { Injectable, EventEmitter } from '@angular/core';
import { User } from './model/user';
import { NoteHttpService } from './note-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedStatus:boolean = false;
  private userActive:User;
  public menuEmitter:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http:NoteHttpService) { }


  public setLoggedStatus(value: boolean ): void {
    this.loggedStatus = value;
    this.menuEmitter.emit(this.loggedStatus);
    this.clearUserLocalStorage(this.loggedStatus);
    localStorage.setItem('loggedin', this.loggedStatus.toString());
  }

  public getLoggedStatus(): boolean {
    return this.loggedStatus;
  }

  public getUserLogged(email: string ): void {
    this.http.getUserByEmail(email).toPromise().then(
      (res) => { 
        this.userActive = res;
        this.setUserLocalStorage(this.userActive);
      },
      (error) => { console.log(error) }
    );
  }

  private setUserLocalStorage(user:User):void {
    for(let prop in user ){
      localStorage.setItem(prop, user[prop]);
    }
  }

  public clearUserLocalStorage(status:boolean):void{
    if(status == false ){
      localStorage.clear();
    }
  }

  public getUserActive():User {
    return this.userActive;
  }

}
