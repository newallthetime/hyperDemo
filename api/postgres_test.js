// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('gpm', 'readonly', 'readonly', {
//   host: '35.185.104.14',
//   dialect: 'postgres'
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

//   sequelize
//   .authenticate(function (err) {
//     if (err) {console.log(err)}
//     console.log("connected")
//   });

const initOptions = {
  // global event notification;
  error(error, e) {
      if (e.cn) {
          // A connection-related error;
          //
          // Connections are reported back with the password hashed,
          // for safe errors logging, without exposing passwords.
          console.log('CN:', e.cn);
          console.log('EVENT:', error.message || error);
      }
  }
};

const pgp = require('pg-promise')(initOptions);


// using an invalid connection string:
const db = pgp('postgresql://readonly:readonly@35.185.104.14:5432/gpm');
// const db = pgp('postgres://testuser:testpass@safepath.ctyarfrlqgnx.us-west-2.rds.amazonaws.com:5432/safepath');

db.connect()
    .then( () => {
        // obj.done(); // success, release the connection;
        console.log("connected")
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });
