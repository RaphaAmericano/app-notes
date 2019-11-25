import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { NoteHttpService } from './note-http.service';
import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, take, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotesValidatorsService {

  constructor(private httpNote: NoteHttpService) { }

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

  public checkMatchPassword():AsyncValidatorFn {
    
    return (group:FormGroup): Observable<{[key:string]: any} | null> =>{
      console.log(group.valueChanges);
      if(group.get('repeat').value === group.get('password').value){ 
        return null;
      };
      return new Observable<{[key:string]: any}>(subscriber => {
        subscriber.next({ passwordMatch: false });
        
        console.log(subscriber);
      });
      

      // return group.valueChanges.pipe(
      //   debounceTime(500),
      //   distinctUntilChanged(),
      //   take(1),
      //   map( (res) => {
      //         console.log(res);
      //         if(group.get('password').value === group.get('repeat').value) {
      //           return null;
      //         } 
      //         return  { passwordMatch: false };
      //     }
      //   )
      // )//pipe
    }
  }
}