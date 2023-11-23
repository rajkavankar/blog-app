import { config } from "../config/config"
import { Client, Account, ID } from "appwrite"

export class AuthService {
	client = new Client()
	account

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId)

		this.account = new Account()
	}

	async register(name, email, password) {
		try {
			const accountCreated = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			)

			if (accountCreated) {
				return this.login(email, password)
			} else {
				return accountCreated
			}
		} catch (error) {
			throw error
		}
	}

	async login(email, password) {
		try {
			const isLoggedin = await this.account.createEmailSession(email, password)

			if (isLoggedin) {
				return isLoggedin
			} else {
				return null
			}
		} catch (error) {
			console.log(error)
		}
	}

	async getUser() {
		try {
			const user = await this.account.get()
			if (user) {
				return user
			} else {
				return null
			}
		} catch (error) {
			console.log(error)
		}
	}

	async logout() {
		try {
			await this.account.deleteSessions()
		} catch (error) {
			console.log(error)
		}
	}
}

const appwriteAuth = new AuthService()

export default appwriteAuth
