const create_user = require('../controllers/user/create_user.js')
const upload_image = require('../controllers/user/upload_image.js')
const create_message = require('../controllers/message/create_message.js')
const create_like = require('../controllers/notification/create_like')
const create_visit = require('../controllers/notification/create_visit')
const create_notification = require('../controllers/notification/create_notification')
const block_user = require('../controllers/user/block_user')
const fs = require('fs');

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

function launchMassCreation(tmp_mail, numberBot) {
  return new Promise(async (resolve, reject) => {
  const firstname = ["Thomas", "Matthew", "Nick", "Victoria", "Victor", "Lamia", "Esmeralda", "Rick", "Morty", "Natasha"]
  const lastname = ["Sanchez", "Bella", "Marthy", "Poly", "Aneh", "Lokjo", "Dachen", "Martin", "El Haoui", "Dupont"]
  const biography = ["This is my bio", "I love Wow", "Let's play together", "My name is no name", "Cry and shout!", "Ouh Yeah, love this app!", "Come on dude", "My bio is long because I love speaking about my self, you know I did lot of things so I think I must share with you.", "Chat and nothing else", "My passion is to go and visit museums!"]
  const interest = ["#Cat", "#Dog", "#Bird", "#Car", "#Bike", "#Cake", "#Cooking", "#Smoking", "#Party", "#Music"]
  const orientations = ['Heterosexual', 'Homosexual', 'Bisexual']
  const genders = ['Man', 'Woman', 'Non-binary']

  for (let i = 0; i < numberBot ; i++) {
      let k = getRandomInt(0,9);
      let j = getRandomInt(0,2)
      
      let body = {};
      body.email = tmp_mail + i + "@mail.com"
      body.password = "Rootroot123$"
      body.firstName = firstname[k]
      body.lastName = lastname[k]
      body.age = getRandomInt(18,65);
      body.gender = genders[j];
      body.orientation = orientations[j];
      body.lat = getRandomInt(10,15)
      body.lng = getRandomInt(5,10)
      body.is_geolocated = true;
      body.biography = biography[k]
      body.interest = interest[k] + "1," + interest[k] + "2," + interest[k] + "3";
      var encoded = base64_encode('../back/db/test/' + k + ".jpeg"); // From the Deployement repo for launch.sh
      //var encoded = base64_encode('./test/' + k + ".jpeg"); // From the DB repo

      await create_user(body, false)
      await upload_image(body, encoded, 0)
    }

    resolve(0);
  })
}

async function createNotifDb(data, type, i, numberBot) {
  if (type === 'like') {
    data.likes = 1;
    await create_like(data);
    if (i < numberBot / 2) {
      let tmp = data.from
      data.from = data.to
      data.to = tmp
      await create_like(data);
    }
  }
  else if (type === "unlike") {
    data.likes = -1;
    await create_like(data);
  }
  else if (type === "visit") {
    create_visit(data);
  }
  create_notification(data);
}

function launchMassRelation(mail, numberBot) {
  return new Promise(async (resolve, reject) => {
    console.log("let's do this")
    const messages = ["Hello there, how are you doing?", "Ouh nice what about you?", "I am good thank you", "Heeeeyyyyyyy", "No wayyy you can help me", "I don't really know", "No but you know I am not sure it is a good idea to mass generate text like that, I don't know why but I don't feel it", "Ok boomer.", "Power to Ironforge", "You rock dude!"]
    const types = ['like', 'unlike', 'visit', 'block']

    for (let j = 0; j < 4; j++) {
      for (let i = 4; i < numberBot; i++) {
        let x = getRandomInt(0,3);
        let type = types[x]

        if (i % 2 != 0) {
          let data1 = {
            from: mail + j + "@mail.com",
            to: mail + i + "@mail.com",
            type: type
          }
          createNotifDb(data1, type, i, numberBot)
          if (i > numberBot / 4) {
            block_user(data1)
          }
        }
        else {
          let data2 = {
            from: mail + i + "@mail.com",
            to: mail + j + "@mail.com",
            type: type
          }
          createNotifDb(data2, type, i, numberBot)
        }

        for (let y = 0; y < 10; y++) {
          let k = getRandomInt(0,9);
          let room = mail + i + "@mail.com" + mail + j + "@mail.com"
          let data = y % 2 != 0 ? {from: mail + i + "@mail.com", to: mail + j + "@mail.com", content: messages[k], room: room,} : {from: mail + j + "@mail.com", to: mail + i + "@mail.com", content: messages[k], room: room,} 
          create_message(data);
        }
      }
    }

  resolve(0);
  })

}

async function run() {
  const mail = "lots"
  const numberBot = 200
  await launchMassCreation(mail, numberBot)
  await launchMassRelation(mail, numberBot)
}

run()