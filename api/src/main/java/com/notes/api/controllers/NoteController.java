package com.notes.api.controllers;

import com.notes.api.models.Note;
import com.notes.api.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping()
    public ResponseEntity<List<Note>> getAllNotes(){
        List<Note> list = noteService.getAllNotes();
        return new ResponseEntity<List<Note>>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") int id ){
        Note note = noteService.getNoteById(id);
        return new ResponseEntity<Note>(note, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Note>> getAllNotesByUserId(@PathVariable("id") int id ){
        List<Note> list = noteService.getAllNotesByUserId(id);
        return new ResponseEntity<List<Note>>(list, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Void> addUNote(@RequestBody Note note ){
        boolean flag = noteService.addNote(note);
        if(flag == false ){
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteNote(@PathVariable("id") int id){
        boolean flag = noteService.deleteNote(id);
        if(flag == false ){
            return new ResponseEntity<Boolean>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Boolean> updateNote(@RequestBody Note note){

        boolean flag = noteService.updateNote(note);
        System.out.println(flag);
        if(flag == false){
            return new ResponseEntity<Boolean>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
    }
}
