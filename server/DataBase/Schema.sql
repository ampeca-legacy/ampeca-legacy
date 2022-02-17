DROP DATABASE IF EXISTS ampeca;
CREATE DATABASE ampeca ; 
USE ampeca
CREATE TABLE user (
    id int AUTO_INCREMENT ,
    username varchar (200),
    email varchar(200) , 
    password varchar(225),
    last_login datetime,
    UNIQUE KEY email (email),
    PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; ; 
CREATE TABLE album(
    id Int NOT NULL AUTO_INCREMENT ,
    gener varchar(500),
    categories varchar(500),
    album_name varchar(500),
    cover varchar(1000), 
    album_descr varchar(500),
    userid Int ,
    PRIMARY KEY (id), 
    FOREIGN  KEY (userid) REFERENCES user(id)
);
CREATE TABLE  songs (
    id int AUTO_INCREMENT ,
    url varchar(1000) ,
    music_Name varchar(50) ,
    id_user Int  ,
    id_album Int , 
    descr varchar(500),
    PRIMARY KEY(id),
    FOREIGN  KEY (id_user) REFERENCES user(id),
    FOREIGN  KEY (id_album) REFERENCES album(id)
) ; 
CREATE TABLE  playlist(
    id int ,
    songs JSON ,
    name varchar(50), 
    PRIMARY KEY (id)
);


CREATE TABLE  playlist_music(
    id_playlist  Int NOT NULL,
    id_music  Int NOT NULL,
    FOREIGN  KEY (id_playlist) REFERENCES playlist(id),
    FOREIGN  KEY (id_music) REFERENCES songs(id)
);

-- ///   mysql -u root -p <server/DataBase/Schema.sql;   ///
