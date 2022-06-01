import { Schema, model } from "mongoose";

export interface IPost {
  name: string;
  size: number;
  key: string;
  url: string;
  label: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  name: String,
  size: Number,
  key: String,
  url: String,
  label: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default model<IPost>('Post', PostSchema);