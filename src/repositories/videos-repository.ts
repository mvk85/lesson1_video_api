import { videos } from "./db"

export const videosRepository = {
    getVideos() {
        return videos;
    },

    getVideoById(id: number) {
        return videos.find(v => v.id === id)
    },

    deleteVideoById(id: number) {
        const videoIndex = videos.findIndex(v => v.id === id)

        if (videoIndex > -1) {
            videos.splice(videoIndex, 1)

            return true;
        }

        return false;
    },

    updateVideoById(id: number, title: string) {
        const video = videos.find(v => v.id === id)

        if (!video) return false;

        video.title = title

        return true;
    },

    createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            title,
            author: 'it-incubator.eu'
        }

        videos.push(newVideo)

        return newVideo
    }
}