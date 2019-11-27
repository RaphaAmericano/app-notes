package com.notes.api.services;

import com.notes.api.daos.NoteDAO;
import com.notes.api.models.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteDAO noteDAO;

    public List<Note> getAllNotes(){ return noteDAO.getAllNotes(); }

    public Note getNoteById(int id){ return noteDAO.getNoteById(id); }

    public List<Note> getAllNotesByUserId(int id){ return noteDAO.getAllNotesByUserId(id); }

    public synchronized boolean addNote(Note note){
        return noteDAO.addNote(note);
    }

    public synchronized boolean updateNote(int id, Note note ){
        return noteDAO.updateNote(id, note);
    }

    public synchronized boolean deleteNote(int id){
        return noteDAO.deleteNote(id);
    }
}
