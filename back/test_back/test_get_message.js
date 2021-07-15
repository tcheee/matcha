const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

axios
  .get('http://localhost:3000/message-history/', {params:{
    from_email: "tche",
    to_email: "other guy"
  }})
  .then(res => {
    console.log(res.data)
  })
  .catch(error => {
    console.error(error)
  })