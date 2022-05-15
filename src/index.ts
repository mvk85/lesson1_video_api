import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Video } from './types'
import { videosRepository } from './repositories/videos-repository'
import { body, validationResult } from 'express-validator'
import { validationTitle } from './middleware/input-validation.middleware'
import { checkValidationErrors } from './middleware/check-errors-validation.middleware'
import { authMiddleware } from './middleware/auth.middleware'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.use(authMiddleware);

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!')
})


app.get('/videos', async (req: Request, res: Response ) => {
    const videos = await videosRepository.getVideos();

    res.send(videos);
})

app.get('/videos/:videoId', async (req: Request, res: Response) => {
    const id = +req.params.videoId;

    const video = await videosRepository.getVideoById(id);

    if (!video) {
        res.send(404)
    } else {
        res.send(video)
    }
})

app.post('/videos', 
    validationTitle,
    checkValidationErrors,
    async (req: Request, res: Response) => {
    const title = req.body.title;
    const newVideo = await videosRepository.createVideo(title);

    if (newVideo) {
        res.status(201).send(newVideo)
    } else {
        res.send(500);
    }    
})

app.delete('/videos/:id', async (req: Request, res: Response)=>{
    const id = +req.params.id;
    const isDeleted = await videosRepository.deleteVideoById(id)

    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404)
    }    
})

app.put('/videos/:id',
    validationTitle,
    checkValidationErrors,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const videoTitle = req.body.title;
        const isUpdated = await videosRepository.updateVideoById(id, videoTitle)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
