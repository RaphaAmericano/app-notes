package com.notes.api.mappers;

import com.notes.api.models.Note;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class NoteMapper implements RowMapper<Note> {

    @Override
    public Note mapRow(ResultSet rs, int rowNum) throws SQLException {
        Note note = new Note();
        note.setId(rs.getInt("ID"));
        note.setId_user(rs.getInt("ID_USUARIO"));
        note.setTexto(rs.getString("NOTA"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String stdata = rs.getString("DATA_EDICAO");
        Date data = null;
        try {
            data = formatter.parse(stdata);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        note.setData_criacao(data);
        return note;
    }
}
