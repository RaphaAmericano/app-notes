import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    return this.http.post<User>(`/api/users/`, user, httpOptions);
  }

  public checkUser(user:User): Observable<any>{
    return this.http.post<User>(`/api/users/check`, user, httpOptions);
  }

  public checkEmail(user:User | string ) : Observable<any> {
    return this.http.post<User | string>(`/api/users/check/email`, user, httpOptions);
  }

  public getUserByEmail(email:string ) : Observable<any> {
    return this.http.get<string>(`/api/users/email/${email}` );
  }

}
