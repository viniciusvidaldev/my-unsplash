import { Request, Response } from "express";
import { ListAllPostsUseCase } from '../useCases/ListAllPostsUseCase';
import { PostsRepository } from '../repositories/implementations/PostsRepository';

class ListAllPostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllPostsUseCase = new ListAllPostsUseCase(new PostsRepository());

    const posts = await listAllPostsUseCase.execute();

    return response.json(posts).status(400);
  }
}

export { ListAllPostsController }