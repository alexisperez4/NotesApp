const { Pool } = require('pg');

const config_db = process.env.NODE_ENV !== 'production' ?
  {
    connectionString: process.env.DATABASE_URL_LOCAL,
  }
  : {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  };

const pool = new Pool(config_db);


// const { Pool } = require('pg');

// const config_db = {
//     user: process.env.DATABASE_USER,
//     host: process.env.DATABASE_HOST,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     port: process.env.DATABASE_PORT
// };

// const pool = new Pool(config_db)

module.exports = pool;