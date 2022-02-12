import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import { ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { MessageRepository } from "../../infra/repositories/MessageRepository";

export class CreateMessageController implements Controller {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const repository = new MessageRepository();

            const cache = new CacheRepository()

            const { uid_user } = req.params;

             const message = await repository.createMessage({ uid_user, ...req.body});
        
            // salvar no cache ( redis )
            const result = await cache.set(
                `messages:${message.uid}`,
                message
              );

            if (!result) console.error("Mensagem não encontrada");

            // limpa a lista de registros do redis, pois o cache está desatualizado neste momento    
            await cache.delete(`messages`)

            return ok(res, message);
        } catch (error: any) {
            return serverError(res, error);
        }
    }
}