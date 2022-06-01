import { Request, Response } from "express";
import { DeletePostUseCase } from '../useCases/DeletePostUseCase';
import { PostsRepository } from '../repositories/implementations/PostsRepository';

class DeletePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { password } = request.body;

    const deletePostUseCase = new DeletePostUseCase(new PostsRepository());

    await deletePostUseCase.execute(id, password);

    return response.sendStatus(204);
  }
}

export { DeletePostController };