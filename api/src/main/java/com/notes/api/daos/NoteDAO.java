package com.notes.api.daos;

import com.notes.api.mappers.NoteMapper;
import com.notes.api.models.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
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

    public Note getNoteById(int id){
        String query = "SELECT * FROM NOTES WHERE ID = ?";
        RowMapper<Note> rowMapper = new NoteMapper();
        Note note = jdbcTemplate.queryForObject(query, rowMapper, id);
        return note;
    }

    public List<Note> getAllNotesByUserId(int id){
        String query = "SELECT N.ID_USUARIO, N.ID, N.NOTA, N.DATA_CRIACAO, N.DATA_EDICAO FROM  NOTES N INNER JOIN USERS U ON N.ID_USUARIO = U.ID WHERE U.ID = ?";
        RowMapper<Note> rowMapper = new NoteMapper();
        return jdbcTemplate.query(query, rowMapper, id);
    }

    public void addNote(Note note){
        String query = "INSERT INTO NOTES (ID_USUARIO, NOTA) VALUES (?, ?)";
        jdbcTemplate.update(query, note.getId_user(), note.getTexto());
    }

    public boolean updateNote(Note note){
        String query = "UPDATE NOTES SET NOTA = ? WHERE ID = ?";
        try{
            jdbcTemplate.update(query, note.getTexto(), note.getId());
            return true;
        }
        catch (IncorrectResultSizeDataAccessException se){
            return false;
        }
    }

    public boolean deleteNote(int id){
        String query = "DELETE FROM NOTES WHERE ID = ?";
        try {
            jdbcTemplate.update(query, id);
            return true;
        } catch(IncorrectResultSizeDataAccessException se){
            return false;
        }
    }
}
