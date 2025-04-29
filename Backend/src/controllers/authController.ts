import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserModel } from '../models/userModel';
import { pool } from '../config/dbConfig';

const userModel = new UserModel(pool);
const authService = new AuthService(userModel);

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        const result = await authService.validateUser(username, password);
        if (result.success) {
            res.json({ success: true, user: result.user });
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};