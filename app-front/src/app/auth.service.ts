import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedStatus:boolean = false;

  public menuEmitter = new EventEmitter<boolean>();

  constructor() { }


  public setLoggedStatus(value: boolean ): void {
    this.loggedStatus = value;
    //emitr o this.logged
    this.menuEmitter.emit(this.loggedStatus);
    localStorage.setItem('loggedin', this.loggedStatus.toString());
  }

  public getLoggedStatus(): boolean {
    return this.loggedStatus;
  }
}
