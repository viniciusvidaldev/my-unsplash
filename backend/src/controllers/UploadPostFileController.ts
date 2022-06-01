import { Request, Response } from "express";
import { UploadPostFileUseCase } from "../useCases/UploadPostFileUseCase";
import { PostsRepository } from '../repositories/implementations/PostsRepository';

class UploadPostFileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { label } = request.body;

    const uploadPostFileUseCase = new UploadPostFileUseCase(new PostsRepository());

    const post = await uploadPostFileUseCase.execute({
      file,
      label,
    });

    return response.json(post).status(201);
  }
}

export { UploadPostFileController };