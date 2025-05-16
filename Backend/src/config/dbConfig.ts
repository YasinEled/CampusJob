import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export const dbConfig = {
    host: process.env.DB_HOST || 'bbdd.teachandlearn.cat',
    user: process.env.DB_USER || 'ddb252377',
    password: process.env.DB_PASSWORD || 'crRFC{bwh8JTQ(',
    database: process.env.DB_NAME || 'ddb252377',
    port: Number(process.env.DB_PORT) || 3306, // Puerto predeterminado de MariaDB/MySQL
};

export const pool = mysql.createPool(dbConfig);