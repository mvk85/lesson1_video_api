import { Router, Request, Response } from "express";
import { videosService } from "../domains/videos.service";
import { checkValidationErrors } from "../middleware/check-errors-validation.middleware";
import { validationTitle } from "../middleware/input-validation.middleware";

export const videosRoutes = Router()

videosRoutes.get('/', async (req: Request, res: Response ) => {
    const videos = await videosService.getVideos();

    res.send(videos);
})

videosRoutes.get('/:videoId', async (req: Request, res: Response) => {
    const id = +req.params.videoId;

    const video = await videosService.getVideoById(id);

    if (!video) {
        res.send(404)
    } else {
        res.send(video)
    }
})

videosRoutes.post('/', 
    validationTitle,
    checkValidationErrors,
    async (req: Request, res: Response) => {
    const title = req.body.title;
    const newVideo = await videosService.createVideo(title);

    if (newVideo) {
        res.status(201).send(newVideo)
    } else {
        res.send(500);
    }    
})

videosRoutes.delete('/:id', async (req: Request, res: Response)=>{
    const id = +req.params.id;
    const isDeleted = await videosService.deleteVideoById(id)

    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404)
    }    
})

videosRoutes.put('/:id',
    validationTitle,
    checkValidationErrors,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const videoTitle = req.body.title;
        const isUpdated = await videosService.updateVideoById(id, videoTitle)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
)
