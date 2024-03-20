import mysql from 'mysql'
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'isha',
  password: 'Isha77ag@',
})

export default connection

// connection.end()