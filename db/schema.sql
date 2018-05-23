### Schema

CREATE DATABASE pie_db;
USE pie_db;

CREATE TABLE pies
(
	id int NOT NULL AUTO_INCREMENT,
	pie_name varchar(255) NOT NULL,
    description varchar(255),
	stock BOOLEAN DEFAULT true,
	PRIMARY KEY (id)
);
