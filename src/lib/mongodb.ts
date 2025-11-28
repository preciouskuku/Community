import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (!db) {
    client = new MongoClient(process.env.MONGO_URI!);
    await client.connect();
    db = client.db('Community_portal'); 
  }
  return db;
}
