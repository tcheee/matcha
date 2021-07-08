const axios = require('axios')

const data = {
    mail: "che@mail.com", 
    password: "root", 
    first_name: "Tom", 
    last_name: "Che", 
    age: 25, 
    genre: 0, 
    orientation: 0, 
    lat: 5, 
    lng: 10, 
    biography: "Lovely bio from test", 
    interests: ["cat", "dog", "lovely"]
}

axios
  .post('http://localhost:3000/register/', data)
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })