import { pool } from './config/dbConfig';

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT NOW()');
        console.log('Conexión exitosa:', rows);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    } finally {
        pool.end();
    }
}

testConnection();