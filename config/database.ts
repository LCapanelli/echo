// const Env = require('dotenv');
require('dotenv').config();
// import Env from 'dotenv';
// require('dotenv').config({path: __dirname + '/.env'})// import Env from 'dotenv';
// Env.config = ({ encoding: 'utf8', debug: process.env.DEBUG });

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  */
    // connection: Env.get('DB_CONNECTION', 'mongodb'),
    mongodb: {
        client: 'mongodb',
        connection: {
            uri: process.env.DB_URI,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            options: {
                useUnifiedTopology: 'true',
                ssl: 'true',
                replicaSet: process.env.DB_HOST,
                authSource: 'admin',
                retryWrites: 'true'
            }
        }
    }
}
// console.log(chalk.bgBlueBright("DOTENVTESTs " + process.env.DB_HOST));