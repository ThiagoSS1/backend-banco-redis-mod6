import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { Message } from "../../domain/models/Message";
import { MessageRepository } from "../../infra/repositories/MessageRepository";

export class GetAllMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      
      const cache = new CacheRepository();

      const messagesCache = await cache.get("messages:List");

      if (messagesCache) {
        return ok(
          res,
          (messagesCache as Message[]).map((mensagem) => mensagem)
        );
      }
      
      const { uid_user } = req.params;

      const repository = new MessageRepository();

      const message = await repository.getMessages(uid_user);

      if (message.length === 0) return notFound(res);

      await cache.set(`messages`, message);

      return ok(res, message)
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}



