import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

type Video = {
    id: number,
    title: string,
    author: string,
}

let videos: Video[] = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]  

const validateVideo = (video: Video) => {
    return !!video.title;
}

const generateErrors = (video: Video) => {
    const errorsMessages = [];

    if (!video.title) {
        errorsMessages.push({ message: 'string', field: "title" })
    }

    if (video.title && String(video.title).length > 40) {
        errorsMessages.push({ message: 'string', field: "title" })
    }
    
    return { errorsMessages, resultCode: 1 }
}

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!')
})


app.get('/videos', (req: Request, res: Response ) => {
    res.send(videos)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;

    const video = videos.find(v => v.id === id)

    if (!video) {
        res.send(404)
    } else {
        res.send(video)
    }
})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }

    if (validateVideo(newVideo)) {
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } else {
        const errors = generateErrors(newVideo)

        res.status(400).send(errors);
    }    
})

app.delete('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const isVideoExist = false;
    const lenghtVideos = videos.length;

    videos = videos.filter(v => v.id !== id)

    if ( videos.length !== lenghtVideos) {
        res.send(204);
    } else {
        res.send(404)
    }    
})

app.put('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const newVideo = req.body;

    const video = videos.find(v => v.id === id)

    if (!video) {
        res.send(404)
    } else if (!validateVideo(newVideo)) {
        const errors = generateErrors(newVideo)

        res.status(400).send(errors);
    } else {
        video.title = newVideo.title
        res.send(204)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
