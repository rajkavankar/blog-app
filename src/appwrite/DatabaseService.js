import { config } from "../config/config"
import { Client, Databases, ID, Query } from "appwrite"

export class DatabaseService {
	client = new Client()
	database
	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId)

		this.database = new Databases(this.client)
	}

	async createPost({ title, content, status, userId, featuredImage }) {
		try {
			return await this.database.createDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				ID.unique(),
				{
					title,
					content,
					status,
					userId,
					featuredImage,
					createdAt: new Date(),
				}
			)
		} catch (error) {
			console.log(console.log("APPWRITE :: create post :: ERROR", error))
		}
	}

	async getPosts(queries = [Query.equal("status", "public")]) {
		try {
			return await this.database.listDocuments(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				queries
			)
		} catch (error) {
			console.log("APPWRITE :: get all posts :: ERROR", error)
			return false
		}
	}

	async getPost(id) {
		try {
			return await this.database.getDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				id
			)
		} catch (error) {
			console.log("APPWRITE :: get post :: ERROR", error)
			return false
		}
	}

	async updatePost(id, { title, content, status, featuredImage }) {
		try {
			return await this.database.updateDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				id,
				{
					title,
					content,
					status,
					featuredImage,
				}
			)
		} catch (error) {
			console.log("APPWRITE :: upadate post :: ERROR", error)
		}
	}

	async deletePost(id) {
		try {
			await this.database.deleteDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				id
			)
			return true
		} catch (error) {
			console.log("APPWRITE :: delete post :: ERROR", error)
			return false
		}
	}
}

const dbService = new DatabaseService()

export default dbService
