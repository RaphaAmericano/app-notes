package com.notes.api.daos;

import com.notes.api.mappers.NoteMapper;
import com.notes.api.models.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public class NoteDAO {

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public NoteDAO(JdbcTemplate jdbcTemplate ){ this.jdbcTemplate = jdbcTemplate; }

    public List<Note> getAllNotes(){
        String query = "SELECT * FROM NOTES";
        RowMapper<Note> rowMapper = new NoteMapper();
        return this.jdbcTemplate.query(query, rowMapper);
    }

    public void addNote(Note note){
        String query = "INSERT INTO NOTES (ID_USUARIO, NOTA) VALUES (?, ?)";
        jdbcTemplate.update(query, note.getId_user(), note.getTexto());
    }

    public void updateNote(Note note){
        String query = "UPDATE NOTES SET NOTA = ? WHERE ID = ?";
        jdbcTemplate.update(query, note.getTexto(), note.getId());
    }

}
