import { config } from "../config/config"
import { Client, Storage, ID } from "appwrite"

export class StorageService {
	client = new Client()
	storage

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId)

		this.storage = new Storage(client)
	}

	async uploadFile(fileBlob) {
		try {
			await this.storage.createFile(
				config.appwriteBucketId,
				ID.unique(),
				fileBlob
			)
		} catch (error) {
			console.log(console.log("APPWRITE :: file upload :: ERROR", error))
			return false
		}
	}

	filePreview(fileId) {
		return this.storage.getFilePreview(config.appwriteBucketId, fileId)
	}

	async deleteFile(fileId) {
		try {
			return await this.storage.deleteFile(config.appwriteBucketId, fileId)
		} catch (error) {
			console.log(console.log("APPWRITE :: file delete :: ERROR", error))
			return false
		}
	}
}

const storageService = new StorageService()

export default storageService
