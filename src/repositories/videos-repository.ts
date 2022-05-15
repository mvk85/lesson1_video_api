import { Video } from "../types";
import { videos } from "./db"

export const videosRepository = {
    async getVideos() {
        return videos;
    },

    async getVideoById(id: number) {
        return videos.find(v => v.id === id)
    },

    async deleteVideoById(id: number) {
        const videoIndex = videos.findIndex(v => v.id === id)

        if (videoIndex > -1) {
            videos.splice(videoIndex, 1)

            return true;
        }

        return false;
    },

    async updateVideoById(id: number, title: string) {
        const video = videos.find(v => v.id === id)

        if (!video) return false;

        video.title = title

        return true;
    },

    async createVideo(title: string) {
        const newVideo: Video = {
            id: +(new Date()),
            title,
            author: 'it-incubator.eu'
        }

        videos.push(newVideo)

        return newVideo
    }
}