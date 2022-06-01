import { AppError } from "../errors/AppError";
import { IPostsRepository } from "../repositories/IPostsRepository";
import { S3Storage } from "../utils/S3Storage";

class DeletePostUseCase {
  private postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.postsRepository = postsRepository;
  }

  async execute(id: string, password: string) {
    const s3 = new S3Storage();

    const userPassword = process.env.USER_PASSWORD;

    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (password !== userPassword) {
      throw new AppError('Wrong password');
    }

    await s3.deleteFile(post.key);
    await this.postsRepository.delete(id);
  }
}

export { DeletePostUseCase };