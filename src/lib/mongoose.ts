// src/lib/mongoose.ts
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://preciouskmutema_db_user:pass12345@cluster0.tda6mdu.mongodb.net/CommunityPortal?retryWrites=true&w=majority";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

// Global variable to cache the connection
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  console.log("✅ Connected to MongoDB with Mongoose");
  return cached.conn;
}
