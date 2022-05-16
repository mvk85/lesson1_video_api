import { Video } from "../types";
import { videosRepository } from "../repositories/videos-db-repository";

export const videosService = {
    async getVideos() {
        return videosRepository.getVideos()
    },

    async getVideoById(id: number) {
        return videosRepository.getVideoById(id)
    },

    async deleteVideoById(id: number) {
        return videosRepository.deleteVideoById(id)
    },

    async updateVideoById(id: number, title: string) {
        return videosRepository.updateVideoById(id, title)
    },

    async createVideo(title: string) {
        const newVideo: Video = {
            id: +(new Date()),
            title,
            author: 'it-incubator.eu'
        }

        const createdProduct = await videosRepository.createVideo(newVideo)

        return createdProduct;
    }
}