const db = require('./db.js')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;

function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

function getRandomFloatBetween(min,max){
    return Math.random()*(max-min+1)+min;
}

async function launchMassCreation() {

  const firstname = ["Thomas", "Matthew", "Nick", "Victoria", "Victor", "Lamia", "Esmeralda", "Rick", "Morty", "Natasha"]
  const lastname = ["Sanchez", "Bella", "Marthy", "Poly", "Aneh", "Lokjo", "Dachen", "Martin", "El Haoui", "Dupont"]
  const biography = ["This is my bio", "I love Wow", "Let's play together", "My name is no name", "Cry and shout!", "Ouh Yeah, love this app!", "Come on dude", "My bio is long because I love speaking about my self, you know I did lot of things so I think I must share with you.", "Chat and nothing else", "My passion is to go and visit museums!"]
  const interest = ["Cat", "Dog", "Bird", "Car", "Bike", "Cake", "Cooking", "Smoking", "Pary", "Music"]
  const images = ["https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__480.jpg", "https://cdn.pixabay.com/photo/2015/11/26/00/14/woman-1063100__340.jpg", "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761__340.jpg", "https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727__340.jpg", "https://cdn.pixabay.com/photo/2015/03/26/09/41/tie-690084__340.jpg", "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166__480.jpg", "https://cdn.pixabay.com/photo/2017/09/21/07/47/girl-2771001__480.jpg", "https://cdn.pixabay.com/photo/2017/10/19/18/23/actress-2868705__480.jpg", "https://cdn.pixabay.com/photo/2017/06/18/18/26/holi-2416686__480.jpg", "https://cdn.pixabay.com/photo/2015/09/18/11/38/man-945438__480.jpg"]

  for (let i = 0; i < 5 ; i++) {
      let k = getRandomInt(0,9);

      const uuid = uuidv4();
      let mail = "testnewot" + i + "@mail.com"
      var password = "test123" + i
      password = await bcrypt.hash(password, saltRounds);
      let fname = firstname[k]
      let lname = lastname[k]
      let age = getRandomInt(18,65);
      let genre = getRandomInt(0,3);
      let orientation = getRandomInt(0,3);
      let latt = getRandomInt(10,15)
      let long = getRandomInt(5,10)
      let bio = biography[k]
      let interest1 = interest[k] + "1";
      let interest2 = interest[k] + "2";
      let interest3 = interest[k] + "3";
      let interests = interest1 + ";" + interest2 + ";" + interest3;
      let image = images[k]
      let unix_timestamp = Date.now();
      let timestamp = new Date(unix_timestamp);

      db.query('INSERT INTO users(uuid, mail, password, first_name, last_name, age, genre, orientation, lat, lng, biography, last_connection, is_active, interests) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);', [uuid, mail, password, fname, lname, age, genre, orientation, latt, long, bio, timestamp, '1', interests], (err, result) => {
          console.log('Dumbing done for ' + mail);
        })

      db.query('INSERT INTO images(user_mail, image_link) VALUES($1, $2);', [mail, image], (err, result) => {
          console.log('Dumbing done for ' + mail);
        })
      
    }

  return (0);
}

launchMassCreation()

/* 

Then create fake data:
- Notifications between the five next until the 495 users
- Likes between the five next until the 495 users
- Visits between the five next until the 495 users
- Messages between the five next until the 495 users

*/