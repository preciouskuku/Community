// src/lib/mongoose.ts
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://preciouskmutema_db_user:pass12345@cluster0.tda6mdu.mongodb.net/CommunityPortal?retryWrites=true&w=majority";

if (!MONGO_URI) throw new Error("MONGO_URI not defined");

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, { bufferCommands: false }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("✅ Connected to MongoDB with Mongoose");
  return cached.conn;
}
