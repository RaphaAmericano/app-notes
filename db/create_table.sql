
CREATE TABLE USERS (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	NOME VARCHAR(255) NOT NULL,
	EMAIL VARCHAR(255) NOT NULL,
	SENHA VARCHAR(255) NOT NULL,
	DATA_CRIACAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE NOTES (
	ID INT AUTO_INCREMENT PRIMARY KEY,
	ID_USUARIO INT,
	NOTA TEXT,
	DATA_CRIACAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	DATA_EDICAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(ID_USUARIO) REFERENCES USERS(ID) ON DELETE CASCADE
);