import axios from 'axios';
import { randomBytes } from 'crypto';

import { S3Storage } from "../utils/S3Storage";
import { AppError } from "../errors/AppError";
import { IPostsRepository } from "../repositories/IPostsRepository"
import { IPost } from '../models/Post';

interface IRequest {
  label: string;
  url: string;
}

class UploadPostUrlUseCase {
  private postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.postsRepository = postsRepository;
  }

  async execute({ label, url }: IRequest): Promise<IPost> {
    const s3 = new S3Storage();

    if (!label) {
      throw new AppError('Label is required');
    }

    if (!url) {
      throw new AppError('No file was uploaded');
    }

    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    // check if format is valid and generate name
    const contentType = response.headers['content-type'];

    const formats = ['image/jpg', 'image/jpeg', 'image/png'];

    if (!formats.includes(contentType)) {
      throw new AppError('Invalid file type');
    }

    const [_, type] = contentType.split('/');

    const name = `${label}.${type}`

    // buffer to get image size
    const buffer = Buffer.from(response.data);

    // key to make image unique
    const keyBuffer = randomBytes(16);

    const keyHash = `${keyBuffer.toString('hex')}-${label}`

    const post = this.postsRepository.create({
      label,
      key: keyHash,
      name,
      url,
      size: buffer.length
    })

    return post;
  }
}

export { UploadPostUrlUseCase }