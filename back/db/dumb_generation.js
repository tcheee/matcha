const create_user = require('../controllers/user/create_user.js')
const upload_image = require('../controllers/user/upload_image.js')
const create_message = require('../controllers/message/create_message.js')
const create_like = require('../controllers/notification/create_like')
const create_visit = require('../controllers/notification/create_visit')
const create_notification = require('../controllers/notification/create_notification')
const block_user = require('../controllers/user/block_user')

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
  const images = ["https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__480.jpg", "https://cdn.pixabay.com/photo/2015/11/26/00/14/woman-1063100__340.jpg", "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761__340.jpg", "https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727__340.jpg", "https://cdn.pixabay.com/photo/2015/03/26/09/41/tie-690084__340.jpg", "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166__480.jpg", "https://cdn.pixabay.com/photo/2017/09/21/07/47/girl-2771001__480.jpg", "https://cdn.pixabay.com/photo/2017/10/19/18/23/actress-2868705__480.jpg", "https://cdn.pixabay.com/photo/2017/06/18/18/26/holi-2416686__480.jpg", "https://cdn.pixabay.com/photo/2015/09/18/11/38/man-945438__480.jpg"]

  for (let i = 0; i < numberBot ; i++) {
      let k = getRandomInt(0,9);
      
      let body = {};
      body.email = tmp_mail + i + "@mail.com"
      body.password = "Rootroot123$"
      body.firstName = firstname[k]
      body.lastName = lastname[k]
      body.age = getRandomInt(18,65);
      body.gender = genders[getRandomInt(0,3)];
      body.orientation = orientations[getRandomInt(0,3)];
      body.lat = getRandomInt(10,15)
      body.lng = getRandomInt(5,10)
      body.is_geolocated = true;
      body.biography = biography[k]
      body.interest = interest[k] + "1," + interest[k] + "2," + interest[k] + "3";

      await create_user(body)
      await upload_image(body, images[k], 0)
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