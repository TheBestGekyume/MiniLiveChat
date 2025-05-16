const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
    rejectUnauthorized: false  // permite conexão SSL sem checar certificado
  }
});

pool.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL:', err);
    } else {
        console.log('Conectado ao PostgreSQL!');
    }
});

module.exports = pool;
