import { Router } from 'express';
import { CreateUserController } from "../controllers/create-user.controller";
import { GetAllUserController } from '../controllers/get-all-user.controller';
import { LoginUserController } from '../controllers/login-user.controller';

export default class UserRoutes {
    public init(): Router {
      const routes = Router();
  
      routes.post("/users", new CreateUserController().handle);
      routes.get("/users", new GetAllUserController().handle);
      routes.post("/login", new LoginUserController().handle);
      return routes;
    }
  }