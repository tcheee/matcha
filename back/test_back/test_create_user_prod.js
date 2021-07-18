const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const data = {
    email: "vi12345@mail.com",
    uuid: uuid, 
    password: "root", 
    firstName: "Tom", 
    lastName: "Che", 
    age: 25, 
    gender: 0, 
    orientation: 0, 
    lat: 5, 
    lng: 10, 
    biography: "Lovely bio from test", 
    interests: ["cat", "dog", "lovely"]
}

axios
  .post('http://https://matcha-heroku.herokuapp.com/register/', data)
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })