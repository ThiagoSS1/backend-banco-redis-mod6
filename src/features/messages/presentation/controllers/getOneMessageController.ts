import { Controller } from "../../../../core/presentation/contracts/controllers";
import { Request, Response} from "express";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { MessageRepository } from "../../infra/repositories/MessageRepository";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Message } from "../../domain/models/Message";

export class GetOneMessageController implements Controller {
    async handle(req: Request, res: Response) {
        try {
            const { uid } = req.params;
            console.log(uid)
            const repository = new MessageRepository();

            // cria uma instância do repositório que cuida do cache
            const cache = new CacheRepository();

            const message = await repository.getMessage(uid);

            // recupera o registro no cache
            const messageCache: Message = await cache.get(`messages:${uid}`);

            // verifica se encontrou e retorna caso verdadeiro
            if (messageCache) {
                return ok(res, messageCache);
            }
            
            if (!message) return notFound(res);

             // salva no redis para o dado ficar cacheado
            await cache.set(`messages:${message.uid}`, message);

            return ok(res, message);
        } catch (error: any) {
            return serverError(res, error);
        }
    }
}