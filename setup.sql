DROP 

CREATE DATABASE test;

USE test;

CREATE TABLE users (
 id int(11) NOT NULL AUTO_INCREMENT,
 name varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 email varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 phone varchar(15) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;