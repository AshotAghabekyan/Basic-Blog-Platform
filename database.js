import { MongoClient } from "mongodb";


let MongoUri = process.env.MongoURI

export async function connectToDB() {
    let client = new MongoClient(MongoUri);
    await client.connect();
    return client.db();
}