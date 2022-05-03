import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]  

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
    videos.push(newVideo)
    res.send(newVideo)
})

app.delete('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;

    videos = videos.filter(v => v.id !== id)
    res.send(200);
})

app.put('/videos/:id',(req: Request, res: Response)=>{
    // put your code here
    const id = +req.params.id;
    const newVideo = req.body;

    const video = videos.find(v => v.id === id)

    if (!video) {
        res.send(404)
    } else {
        video.title = newVideo.title
        res.send(200)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})