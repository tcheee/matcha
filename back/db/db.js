const { Pool } = require('pg')

////LOCAL env ..
const pool = new Pool({
    host: "127.0.0.1",
    port: 5432,
    user: "root",
    password: "root",
    database: "matcha"
});

////PROD 
// const pool = new Pool ({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// })


module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      if (err) {
        console.log(err);
      }
      else {
        // console.log('Param for the query below: ', {params})
        // console.log('executed query', { text, duration, rows: res.rowCount })
      }
      callback(err, res)
    })
  },
}