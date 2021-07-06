CREATE TABLE users
(
    id INT PRIMARY KEY NOT NULL,
    mail VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age VARCHAR(100) NOT NULL,
    genre INT NOT NULL,
    orientation INT NOT NULL,
    lat INT NOT NULL,
    lng INT NOT NULL,
    biography VARCHAR(65535) NOT NULL,
    fame INT NOT NULL DEFAULT 100,
    last_connection TIMESTAMP, 
    is_active BOOLEAN DEFAULT '0', 
    interests VARCHAR(65535) NOT NULL
);

CREATE TABLE images
(
    id INT PRIMARY KEY NOT NULL, 
    user_mail VARCHAR(100) NOT NULL,
    image_link VARCHAR(65535),
    orders INT NOT NULL DEFAULT 0
);

CREATE TABLE notifications
(
    id INT PRIMARY KEY NOT NULL, 
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    notification_type VARCHAR(100) NOT NULL,
    content VARCHAR(255),
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inboxes
(
    id INT PRIMARY KEY NOT NULL, 
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    content VARCHAR(65535),
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visits
(
    id INT PRIMARY KEY NOT NULL, 
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes
(
    id INT PRIMARY KEY NOT NULL, 
    from_mail VARCHAR(100) NOT NULL, 
    to_mail VARCHAR(100) NOT NULL,
    likes INT NOT NULL,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches
(
    id INT PRIMARY KEY NOT NULL, 
    mail_a VARCHAR(100) NOT NULL, 
    mail_b VARCHAR(100) NOT NULL,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(id, mail, password, first_name, last_name, age, genre, orientation, lat, lng, biography, interests) VALUES
 (1, 'test@mail.com', 'oitnbionbtin', 'another', 'guy', 25, 1, 0, 10, 25, 'This is my bio', 'test;interest;lol'),
 (2, 'testigo@mail.com', 'oitngorpbionbtin', 'another', 'tom', 25, 1, 0, 10, 25, 'This is my bio', 'test;interest;lol');

INSERT INTO images(id, user_mail, image_link) VALUES
 (1, 'test@mail.com', 'http://link/ec2/photos_1');

INSERT INTO notifications(id, from_mail, to_mail, notification_type) VALUES
 (1, 'test@mail.com', 'to@mail.com', 'visit');

INSERT INTO inboxes(id, from_mail, to_mail, content) VALUES
 (1, 'test@mail.com', 'to@mail.com', 'Yo, comment tu vas?');

INSERT INTO visits(id, from_mail, to_mail) VALUES
 (1, 'test@mail.com', 'to@mail.com');

INSERT INTO likes(id, from_mail, to_mail, likes) VALUES
 (1, 'test@mail.com', 'to@mail.com', 1);

INSERT INTO matches(id, mail_a, mail_b) VALUES
 (1, 'test@mail.com', 'to@mail.com');