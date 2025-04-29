export class AuthService {
    private users: any; // Este debería ser el modelo de usuario real

    constructor(usersModel: any) {
        this.users = usersModel;
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.users.findByEmail(email); // Cambiado a buscar por email
        if (user && user.password === password && user.activo === 1) {
            return { success: true, user };
        }
        return { success: false, message: "Email or password not correct, or account not activated." };
    }
}