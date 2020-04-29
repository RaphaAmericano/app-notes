import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteHttpService {

  private readonly API = environment.API;

  constructor( private http:HttpClient ) { }
  
  public postNewUser(user: User): Observable<boolean> {    
    return this.http.post<boolean>(`/api/users/`, user).pipe(
      catchError(this.handleError)
    );
  }

  public checkUserId(id:number): Observable<boolean>{
    return this.http.get<boolean>(`/api/users/check/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public checkEmail(email: string ) : Observable<true> {
    return this.http.get<true>(`/api/users/check/email/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  public getUserByEmail(email:string ) : Observable<User> {
    return this.http.get<User>(`/api/users/email/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  public getAllUserNotes(id:number) : Observable<Note[]> {
    return this.http.get<Note[]>(`/api/notes/user/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public getNoteById(id:number): Observable<Note> {
    return this.http.get<Note>(`/api/notes/${id}`).pipe(
      catchError(this.handleError)
    );
  } 

  public postNewNote(note:Note) : Observable<boolean> {
    return this.http.post<boolean>(`/api/notes`, note).pipe(
      catchError(this.handleError)
    );
  }

  public updateUserNote(note:Note): Observable<void> {
    return this.http.patch<void>(`/api/notes/${note.id}`, note).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUserNote(note:Note): Observable<boolean> {
    return this.http.delete<boolean>(`/api/notes/${note.id}`).pipe(
      catchError(this.handleError)
    );
  }

  public updateUser(user:User): Observable<boolean> {
    return this.http.put<boolean>(`/api/users/update`,user).pipe(
      catchError(this.handleError)
    );
  }

  public updateUserPassword(user:User): Observable<boolean> {
    return this.http.put<boolean>(`/api/users/update/password`, user).pipe(
      catchError(this.handleError)
    );
  }

  public checkUserPassword( password:string, email:string) : Observable<boolean> {
    const passwordHash = btoa(password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : `Basic ${passwordHash}`
      })
    }
    return this.http.get<boolean>(`/api/users/check/password/${email}`,  httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUser(user:User): Observable<boolean> {
    return this.http.delete<boolean>(`/api/users/delete/${user.id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(err){
    let errorMessage = { message: err,};
    //todo: message
    // return EMPTY;
    return throwError(errorMessage);
  }
}
