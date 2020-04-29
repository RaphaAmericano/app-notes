import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { NoteHttpService } from './note-http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject:BehaviorSubject<User>; 
  private loggedSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http:NoteHttpService, private router:Router) { 
    this.userSubject = new BehaviorSubject<User>(this.getUserStorage());
    if(this.userSubject.value.id > 0 ){
      this.loggedSubject.next(true);
    }
  }

  public setLoggedStatus(value:boolean ) {
    this.loggedSubject.next(value);
  }

  public setUserActive(user:User) {
    delete user.senha;
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserLogged(email: string ): void {
    this.http.getUserByEmail(email).subscribe(
      (user) => {
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

  public getUserValue(): User {
    return this.userSubject.value;
  }

  public logoutAuth(): Observable<void> {
    return new Observable(
      (observer) => {
        this.clearUserLocalStorage();
        this.setLoggedStatus(false);
        
        observer.complete();
      } 
    )
  }

}
