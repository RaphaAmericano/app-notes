import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../model/note';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(notes: Note[], searchText: string): Note[] {
    if(!notes){ return null; };
    if(!searchText){ return notes; };
    searchText = searchText.toLowerCase();
    return notes.filter( note => {
      if(note.texto != null ){
        return note.texto.toLowerCase().includes(searchText);
      }
    });
  }

}
