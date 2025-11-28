// src/lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://preciouskmutema_db_user:pass12345@cluster0.tda6mdu.mongodb.net/CommunityPortal";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = uri;
}

if (process.env.NODE_ENV === "development") {
  // In dev mode, use a global variable so hot reloads don't create new connections
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI!, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI!, options);
  clientPromise = client.connect();
}

export default clientPromise;
