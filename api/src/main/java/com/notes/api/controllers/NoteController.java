package com.notes.api.controllers;

import com.notes.api.models.Note;
import com.notes.api.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @PostMapping()
    public ResponseEntity<Void> addUNote(@RequestBody Note note ){
        boolean flag = noteService.addNote(note);
        if(flag == false ){
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
