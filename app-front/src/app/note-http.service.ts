import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from './model/note';

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

}
