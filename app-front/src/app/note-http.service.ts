import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class NoteHttpService {

  private readonly API = environment.API;

  constructor( private http:HttpClient ) { }
  
  public postNewUser(user: User): Observable<any> {
    
    console.log(user);
    console.log(httpOptions);
    return this.http.post<User>(`/api/users/`, user);
  }

  public checkUser(user:User){
    return this.http.post<User>("/api/check", user, httpOptions);
  }

}
