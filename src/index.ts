import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { authMiddleware } from './middleware/auth.middleware'
import { videosRoutes } from './routers/videos.routers'
import { runDb } from './repositories/db'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.use(authMiddleware);
app.use('/videos', videosRoutes);

const startApp = async () => {
    await runDb();

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp();
