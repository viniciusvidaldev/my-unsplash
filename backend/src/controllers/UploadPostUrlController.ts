import { Request, Response } from "express";
import { UploadPostUrlUseCase } from "../useCases/UploadPostUrlUseCase";
import { PostsRepository } from '../repositories/implementations/PostsRepository';

class UploadPostUrlController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { url, label } = request.body;

    const uploadPostUrlUseCase = new UploadPostUrlUseCase(new PostsRepository());

    const post = await uploadPostUrlUseCase.execute({ label, url });

    return response.json(post).status(201);
  }
}

export { UploadPostUrlController }