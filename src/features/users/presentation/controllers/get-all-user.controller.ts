import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/UserRepository";



export class GetAllUserController implements Controller {
    async handle(req: Request, res: Response): Promise<any> {
        try {

            const repository = new UserRepository();

            const user = await repository.getUser();

            if(!user) return notFound(res)

            return ok(res, user);
        } catch (error: any) {
            return serverError(res, error);
        }
    }
}
