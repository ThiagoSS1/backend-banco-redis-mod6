import { Router } from 'express';
import { CreateMessageController } from "../controllers/create-message.controller";
import { DeleteMessageController } from "../controllers/deleteMessageController";
import { GetAllMessageController } from '../controllers/getAllMessageController';
import { GetOneMessageController } from '../controllers/getOneMessageController';
import { UpdateMessageController } from '../controllers/updateMessageController';

export default class MessageRoutes {
    public init(): Router {
      const routes = Router();
  
      routes.post("/messages/:uid_user", new CreateMessageController().handle);
      routes.put("/messages/:uid_user/:uid", new UpdateMessageController().handle);
      routes.get("/message/:uid", new GetOneMessageController().handle);
      routes.get("/messages/:uid_user", new GetAllMessageController().handle);
      routes.delete("/messages/:uid_user/:uid", new DeleteMessageController().handle);
  
      return routes;
    }
  }