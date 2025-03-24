DROP DATABASE IF EXISTS todo;

CREATE DATABASE todo;

USE todo;

CREATE TABLE task (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

INSERT INTO task(description) VALUES('My test task');
INSERT INTO task(description) VALUES('My another task');
