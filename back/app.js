const express = require('express')
const app = express()
const port = 3000
const db = require('./db/db.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/sign-up/', (req, res) => {
    res.send('I will create a user!')
});

app.get('/login/', (req, res) => {
    res.send('I will log you!')
});

app.get('/:mail', (req, res, next) => {
    db.query('SELECT * FROM public.users WHERE mail = $1', [req.params.mail], (err, result) => {
      if (err) {
        return next(err)
      }
      console.log(result.rows[0]);
      res.send(result.rows[0]);
    })
  })

app.use((req, res) => {
    res.status(404).send('We did not find what you were looking for ...');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});