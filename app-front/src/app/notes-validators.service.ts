import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { NoteHttpService } from './note-http.service';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, take, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotesValidatorsService {

  constructor(private httpNote: NoteHttpService) { }

  public emailCheckValidator() : AsyncValidatorFn {
    
    return (control: AbstractControl): Observable<{[key: string]: any } | null> => { 
      // if(control && control.value !== null || control.value !== undefined ){
      //   return new Observable().pipe() ;
      // }
      
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap( () => this.httpNote.checkEmail(control.value).pipe(
          map( res => {
            console.log(res);
            if(res == false ){
              return { checkEmail: res };
            }
            return null;
          })
        ))
      )


      // return this.httpNote.checkEmail(control.value).pipe( 
      //   map( res => {
      //     console.log(res);
      //     if(res == false ){
      //       return { checkEmail: res };
      //     }
      //     return null;
      //   })
      // )
    }
  
  }
}
