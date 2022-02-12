import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import { ok, serverError } from "../../../../core/presentation/helpers/helpers"; 
import { UserRepository } from "../../infra/repositories/UserRepository";

export class CreateUserController implements Controller {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const repository = new UserRepository();
            console.log(repository)
            const user = await repository.createUser(req.body);
            
            if(!user) console.log("Usuário não encontrado");	

            return ok (res, user); 
        } catch (error: any) {
            return serverError(res, error);
        }
    }
}