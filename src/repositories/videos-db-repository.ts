import { Video } from "../types";
import { videosCollections } from "./db";

export const videosRepository = {
    async getVideos() {
        return videosCollections.find().toArray()
    },

    async getVideoById(id: number) {
        return videosCollections.findOne({ id })
    },

    async deleteVideoById(id: number) {
        const result = videosCollections.deleteOne({ id })
        
        return (await result).deletedCount == 1
    },

    async updateVideoById(id: number, title: string) {
        const result = await videosCollections.updateOne({ id }, { $set: { title }})
        
        return result.matchedCount;
    },

    async createVideo(newVideo: Video) {
        videosCollections.insertOne(newVideo)

        return newVideo
    }
}