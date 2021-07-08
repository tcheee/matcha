const axios = require('axios')

const data = {
    mail: "test@mail.com"
}

axios
  .post('http://localhost:3000/all/', data)
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })