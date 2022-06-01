import Post, { IPost } from "../models/Post";
import { IPostsRepository } from "../repositories/IPostsRepository";


class ListAllPostsUseCase {
  private postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.postsRepository = postsRepository;
  }
  
  async execute(): Promise<IPost[]> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}

export { ListAllPostsUseCase }