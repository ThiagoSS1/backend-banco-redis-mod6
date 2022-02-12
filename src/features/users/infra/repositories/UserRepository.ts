import { User } from "../../domain/models/User";
import { UserEntity } from "../../../../core/infra/data/database/entities/UserEntity";

interface UserParams { //Duvidas quais propriedades devem ser passadas para o repositorio?
    uid?: string;
    name: string;
    password: string;
}


export class UserRepository {

    async createUser(data: UserParams): Promise<User> {

        const userEntity = UserEntity.create({
            name: data.name,
            password: data.password,
        });
    
        const verificaNome = await UserEntity.findOne({
            where: { name: data.name },
          });
          if (verificaNome) throw new Error("ALREADY_EXIST_USER_ERROR");
      

        await userEntity.save();

        return this.mapperFromEntityToModel(userEntity);
    }


    async getUser(): Promise<UserEntity[] | undefined> {

        const userEntity = await UserEntity.find();

        if (userEntity.length === 0) return undefined;

        return userEntity;
    }

    async login(data: UserParams): Promise<User | undefined> {

    
        const user = await UserEntity.findOne({
            where: { name: data.name}
        })

        if (!user) return undefined;

    
        return this.mapperFromEntityToModel(user);
    }

    private mapperFromEntityToModel(entity: UserEntity): User {
        return {
            uid: entity.uid,
            name: entity.name,
            password: entity.password,
            
        }
    }

}
