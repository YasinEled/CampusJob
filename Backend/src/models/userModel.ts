import { Pool } from 'mysql2/promise';

export class UserModel {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async findByUsername(username: string) {
        const query = 'SELECT * FROM usuario WHERE nomUsuari = ?';
        const [rows]: any = await this.pool.query(query, [username]);
        return rows[0]; // Retorna el primer usuario encontrado
    }
}