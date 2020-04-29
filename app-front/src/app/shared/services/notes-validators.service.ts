import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { NoteHttpService } from './note-http.service';
import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, take, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class NotesValidatorsService {

  constructor(private httpNote: NoteHttpService, private auth: AuthService) { }

  public emailCheckValidator(exists:boolean) : AsyncValidatorFn {
    
    return (control: AbstractControl): Observable<{[key: string]: any } | null> => { 
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap( () => this.httpNote.checkEmail(control.value).pipe(
          map( res => {
            if(res == exists ){
              return { checkEmail: res };
            }
            return null;
          })
        ))
      )
    }
  }

  public passwordCheckValidator() : AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap( () => 
         this.httpNote.checkUserPassword(control.value, this.auth.getUserValue().email).pipe(
          map( res => {
            if(res == false ){
              return { checkPassword: res}
            }
            return null;
          })
        ))
      )
    }
  }

  public checkMatchPassword(passowrdKey:string, repeatKey:string ):ValidatorFn {
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if(!control){ return null;}
      const password = control.get(passowrdKey);
      const confirmRepeat = control.get(repeatKey);
      if(!password.value || !confirmRepeat.value){
        return null;
      }
      if(password.value !== confirmRepeat.value){
        
        return { passwordMismatch: true };
      }
      return null;
    };
  }
}