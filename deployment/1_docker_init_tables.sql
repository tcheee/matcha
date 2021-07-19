CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(100) UNIQUE,
    mail VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    orientation VARCHAR(100) NOT NULL,
    lat VARCHAR(100),
    lng VARCHAR(100),
    is_geolocated VARCHAR(100) DEFAULT 'false', 
    biography VARCHAR(65535),
    fame INT NOT NULL DEFAULT 100,
    last_connection TIMESTAMP, 
    is_active BOOLEAN DEFAULT '0', 
    is_online BOOLEAN DEFAULT '0',
    interests VARCHAR(65535) NOT NULL
);

CREATE TABLE images
(
    id SERIAL PRIMARY KEY,
    user_mail VARCHAR(100) NOT NULL,
    image_link TEXT,
    orders INT NOT NULL DEFAULT 0
);

CREATE TABLE notifications
(
    id SERIAL PRIMARY KEY,
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    notification_type VARCHAR(100) NOT NULL,
    content VARCHAR(255),
    seen BOOLEAN DEFAULT '0',
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inboxes
(
    id SERIAL PRIMARY KEY,
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    content VARCHAR(65535),
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visits
(
    id SERIAL PRIMARY KEY,
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes
(
    id SERIAL PRIMARY KEY,
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    likes INT NOT NULL,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches
(
    id SERIAL PRIMARY KEY,
    mail_a VARCHAR(100) NOT NULL, 
    mail_b VARCHAR(100) NOT NULL,
    room VARCHAR(100) NOT NULL UNIQUE,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blocks
(
    id SERIAL PRIMARY KEY,
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    blocked BOOLEAN DEFAULT '1', 
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(uuid, mail, password, first_name, last_name, age, genre, orientation, lat, lng, biography, interests) VALUES
 ('testbbbb', 'test@mail.com', 'oitnbionbtin', 'another', 'guy', 25, 'Man', 'Hetero', 10.15, 25.30, 'This is my bio', 'test;interest;lol'),
 ('aaa-roigngionio', 'testigo@mail.com', 'oitngorpbionbtin', 'another', 'tom', 25, 'Girl', 'Bi', 10.20, 18.18756478, 'I love dating apps', 'test;interest;lol');

INSERT INTO images(user_mail, image_link) VALUES
 ('test@mail.com', 'http://link/ec2/photos_1');

INSERT INTO notifications(from_mail, to_mail, notification_type) VALUES
 ('test@mail.com', 'to@mail.com', 'visit');

INSERT INTO inboxes(from_mail, to_mail, content) VALUES
 ('test@mail.com', 'to@mail.com', 'Yo, comment tu vas?');

INSERT INTO visits(from_mail, to_mail) VALUES
 ('test@mail.com', 'to@mail.com');

INSERT INTO likes(from_mail, to_mail, likes) VALUES
 ('test@mail.com', 'to@mail.com', 1);

INSERT INTO matches(mail_a, mail_b, room) VALUES
 ('test@mail.com', 'to@mail.com', 'uuid-first-room');

INSERT INTO blocks(from_mail, to_mail) VALUES
 ('test@mail.com', 'toblockingmail@mail.com');