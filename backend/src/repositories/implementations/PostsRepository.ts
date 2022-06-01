import { IPostsRepository } from '../IPostsRepository';
import { ICreatePostDTO } from "../../dtos/ICreatePostDTO";
import Post, { IPost } from '../../models/Post';

class PostsRepository implements IPostsRepository {
  async create({ name, size, key, url, label }: ICreatePostDTO): Promise<IPost> {
    const post = await Post.create({
      name,
      size,
      key,
      url,
      label
    })

    return post;
  }

  async findAll(): Promise<IPost[]> {
    const posts = await Post.find();

    return posts;
  }

  async findById(id: string): Promise<IPost | null> {
    const post = await Post.findById(id);

    return post;
  }

  async delete(id: string): Promise<void> {
    const post = await Post.findById(id);

    post?.remove();
  }
}

export { PostsRepository }