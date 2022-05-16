import {MongoClient} from 'mongodb'

const mongoUri = process.env.mongoUri || 'mongodb://0.0.0.0:27017'

const client = new MongoClient(mongoUri);

const videosDb = client.db("videos");

export const videosCollections = videosDb.collection("videos");

export async function runDb() {
    try {
        // Connect client to the server
         await client.connect();

        //Establish and verify connection
        await client.db("videos").command({ ping: 1 })

        console.log("Connection successfuly to mongo server")
    } catch(e) {
        // Ensures that the client will close when you finish/error
        console.log("Cannot connect to mongodb, error: ", e)
        await client.close()
    }    
}