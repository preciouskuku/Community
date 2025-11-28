import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  author: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Avoid recompiling model during hot reload
export const Post = models.Post || model<IPost>("Post", PostSchema);
