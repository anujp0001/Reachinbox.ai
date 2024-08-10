import { Client, Account, ID } from "appwrite";

interface UserCredentials {
    email: string;
    password: string;
    name?: string;
}

export class AuthService {
    private client: Client;
    private account: Account;

    constructor() {
        this.client = new Client()
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("660ca0bed26281bcbcd9");
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }: UserCredentials) {
        try {
            console.log(email);
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log(userAccount)
            if (userAccount) {
                // Call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }: UserCredentials) {
        try {
            console.log("User logged in");
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;