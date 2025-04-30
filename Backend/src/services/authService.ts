export class AuthService {
    private users: any; // Este debería ser el modelo de usuario real

    constructor(usersModel: any) {
        this.users = usersModel;
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.users.findByUsername(username); // Cambiado a buscar por username
        if (user && user.password === password && user.activo === 1) {
            return { success: true, user };
        }
        return { success: false, message: "Username or password not correct, or account not activated." };
    }
}