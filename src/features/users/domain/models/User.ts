/**
 * Éssa é uma model que representa o dominio dessa feature,
 * como basicamente vai ser um tipo, podemos definir como uma interface.
 */

import { MessageEntity } from "../../../../core/infra/data/database/entities/MessageEntity";

 export interface User {
  uid: string;
  name: string;
  password: string;
  messages?: Array<MessageEntity>;
}
