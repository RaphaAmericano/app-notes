import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
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

  public getAllUserNotes(id:number) : Observable<Note[]> {
    return this.http.get<Note[]>(`/api/notes/user/${id}`);
  }

  public postNewNote(note:Note) : Observable<boolean> {
    return this.http.post<boolean>(`/api/notes`, note, httpOptions);
  }

  public updateUserNote(note:Note): Observable<void> {
    return this.http.patch<void>(`/api/notes/${note.id}`, note, httpOptions);
  }

  public deleteUserNote(note:Note): Observable<boolean> {
    return this.http.delete<boolean>(`/api/notes/${note.id}`, httpOptions );
  }

  public updateUser(user:User): Observable<boolean> {
    return this.http.put<boolean>(`/api/users/update`,user, httpOptions);
  }

  public updateUserPassword(user:User): Observable<boolean> {
    return this.http.put<boolean>(`/api/users/update/password`, user, httpOptions);
  }

  public checkUserPassword(password:string, id:number) : Observable<boolean> {
    let user = new User();
    user.id = id;
    user.senha = password;
    return this.http.post<boolean>(`/api/users/check/password`, user, httpOptions);
  }

  public deleteUser(user:User): Observable<boolean> {
    return this.http.delete<boolean>(`/api/users/delete/${user.id}`, httpOptions );
  }

}
