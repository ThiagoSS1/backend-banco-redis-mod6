import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import { ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/UserRepository";
export class LoginUserController implements Controller {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            
            const repository = new UserRepository();

            const user = await repository.login(req.body);
            console.log(user);

            if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

            if (user.password !== req.body.password) return res.status(401).json({ error: 'Senha incorreta' });

            return ok(res, user);
        } catch (err: any) {
            return serverError(res, err)
        }
    }
}