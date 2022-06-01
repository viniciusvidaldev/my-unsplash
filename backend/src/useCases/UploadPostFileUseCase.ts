import { AppError } from "../errors/AppError";
import { IPost } from "../models/Post";
import { IPostsRepository } from '../repositories/IPostsRepository';

interface IRequest {
  file: Express.MulterS3.File;
  label: string;
}

class UploadPostFileUseCase {
  private postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.postsRepository = postsRepository;
  }

  async execute({ file, label }: IRequest): Promise<IPost> {
    if (!file) {
      throw new AppError('No file was uploaded');
    }

    if (!label) {
      throw new AppError('Label is required')
    }

    const post = await this.postsRepository.create({
      name: file.originalname,
      size: file.size,
      key: file.key,
      url: file.location,
      label: label,
    })

    return post;
  }
}

export { UploadPostFileUseCase }