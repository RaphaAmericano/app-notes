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
        String stdata_criacao = rs.getString("DATA_CRIACAO");
        String stdata_edicao = rs.getString("DATA_EDICAO");
        Date data_criacao = null;
        Date data_edicao = null;
        try {
            data_criacao = formatter.parse(stdata_criacao);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        try {
            data_edicao = formatter.parse(stdata_edicao);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        note.setData_criacao(data_criacao);
        note.setData_edicao(data_edicao);
        return note;
    }
}
