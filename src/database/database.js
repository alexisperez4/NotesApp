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


module.exports = pool;