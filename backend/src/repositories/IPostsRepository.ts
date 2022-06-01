import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { IPost } from "../models/Post";

export interface IPostsRepository {
  create: (data: ICreatePostDTO) => Promise<IPost>;
  findAll: () => Promise<IPost[]>;
  findById: (id: string) => Promise<IPost | null>;
  delete: (id: string) => Promise<void>;
}