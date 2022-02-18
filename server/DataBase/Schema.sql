DROP DATABASE IF EXISTS ampeca;
CREATE DATABASE ampeca ; 
USE ampeca;
CREATE TABLE user (
    id_user int AUTO_INCREMENT ,
    username varchar (200),
    email varchar(200) , 
    password varchar(225),
    last_login datetime,
    image_user varchar(2000),
    UNIQUE KEY email (email),
    PRIMARY KEY (id_user)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;;

CREATE TABLE album(
    id_album Int NOT NULL AUTO_INCREMENT ,
    gender_album varchar(500),
    category_album varchar(500),
    name_album varchar(500),
    cover_album varchar(1000), 
    descr_album varchar(500),
    id_user Int ,
    PRIMARY KEY (id_album), 
    FOREIGN  KEY (id_user) REFERENCES user(id_user)
);
CREATE TABLE  music (
    id_music int AUTO_INCREMENT ,
    url_music varchar(1000) ,
    name_music varchar(50) ,
    id_user Int  ,
    id_album Int , 
    descr_music varchar(500),
    PRIMARY KEY(id_music),
    FOREIGN  KEY (id_user) REFERENCES user(id_user),
    FOREIGN  KEY (id_album) REFERENCES album(id_album)
) ; 
CREATE TABLE  playlist(
    id_playlist int ,
    id_user int,
    name_playlist varchar(50), 
    FOREIGN key(id_user)REFERENCES user(id_user),
    PRIMARY KEY (id_playlist)
);


CREATE TABLE  playlist_music(
    id_playlist  Int NOT NULL,
    id_music  Int NOT NULL,
    PRIMARY key(id_playlist,id_music),
    FOREIGN  KEY (id_playlist) REFERENCES playlist(id_playlist),
    FOREIGN  KEY (id_music) REFERENCES music(id_music)
);

-- ///   mysql -u root -p <server/DataBase/Schema.sql;   ///
