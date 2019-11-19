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
}
