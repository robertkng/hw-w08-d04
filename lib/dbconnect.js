const pg       = require('pg-promise')({});
const pgConfig = {
                    host:     process.env.DB_HOST,
                    port:     process.env.DB_PORT,
                    database: 'moviesdb',
                    user:     process.env.DB_USER,
                    password: process.env.DB_PASSWORD
                  };

const db       = pg(pgConfig);

module.exports = db;
