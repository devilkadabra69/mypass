import { Client, Account, Databases, ID, Query } from "appwrite";
import EnvConfig from "../config/EnvConfig"
export class AppwriteAuthService {
    client = new Client();
    account;
    database;
    constructor() {
        this.client.setEndpoint(EnvConfig.endpoint).setProject(EnvConfig.project_id);
        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //now from here we will make functions for databases
    //TODO line55-70 and in home too
    async createPost(data) {
        try {
            const sId = ID.unique(); //this is basically an ID which is unique to the post
            return await this.database.createDocument(EnvConfig.database_id, EnvConfig.collection_id, sId, { ...data, SID: sId })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async editPost(sId, { siteName, siteUrl, password, dateTime }) {
        try {
            return await this.database.updateDocument(EnvConfig.database_id, EnvConfig.collection_id, sId, {
                SITE_PASSWORD: password,
                SID: sId,
                SITE_NAME: siteName,
                DATE_TIME: dateTime,
                SITE: siteUrl,
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deletePost(sId) {
        try {
            await this.database.deleteDocument(EnvConfig.database_id, EnvConfig.collection_id, sId);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(sId) {
        try {
            return await this.database.getDocument(EnvConfig.database_id, EnvConfig.collection_id, sId)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getPosts(uId) {
        try {
            return await this.database.listDocuments(EnvConfig.database_id, EnvConfig.collection_id, [Query.equal("UID", uId)])
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const appwriteAuthService = new AppwriteAuthService();
export default appwriteAuthService;

