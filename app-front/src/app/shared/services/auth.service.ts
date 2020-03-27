import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { NoteHttpService } from './note-http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userSubject:BehaviorSubject<User>; 
  private loggedSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http:NoteHttpService) { 
    this.userSubject = new BehaviorSubject<User>(this.getUserStorage());
    console.log(this.userSubject.value.id);
    if(this.userSubject.value.id > 0  ){
      console.log('constructor');
      this.loggedSubject.next(true);
      console.log('status', this.loggedSubject.value);
    }
  }

  public setLoggedStatus(value:boolean ) {
    this.loggedSubject.next(value);
  }

  public setUserActive(user:User) {
    localStorage.setItem('loggedin', JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getUserLogged(email: string ): void {
    this.http.getUserByEmail(email).subscribe(
      (user) => {
        console.log(user);
        this.userSubject.next(user);
        this.loggedSubject.next(true)
      },
      (err) => console.log(err)
    )
  } 

  private getUserStorage(): User {
    return Object.assign(new User(), JSON.parse(localStorage.getItem('loggedin')));
  }

  public clearUserLocalStorage(): void{
    this.userSubject.next(null);
    localStorage.clear();
  }

  public getUserActive(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public getLoggedStatus(): Observable<boolean> {
    return this.loggedSubject.asObservable();
  }

  public getStatusValue(): boolean {
    return this.loggedSubject.value;
  }

  public logoutAuth(): void {
    this.clearUserLocalStorage();
    this.setLoggedStatus(false);
  }

}
