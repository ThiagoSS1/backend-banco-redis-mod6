import { MessageEntity } from "../../../../core/infra/data/database/entities/MessageEntity";
import { Message } from "../../domain/models/Message";


export interface MessageParams { // Duvidas quais propriedades devem ser passadas para o repositorio?
    uid?: string;
    title: string;
    description: string;
    uid_user: string;
}

export class MessageRepository {

    async createMessage(data: MessageParams): Promise<Message> {
        const messageEntity = MessageEntity.create({
            title: data.title,
            description: data.description,
            uidUser: data.uid_user,
        })

        await messageEntity.save();

        return this.mapperFromEntityToModel(messageEntity);
    }

    async updateMessage(data: MessageParams): Promise<Message | undefined> {
        const messageEntity = MessageEntity.findOne(data.uid, {
            where: { uidUser: data.uid_user }
        })

        if (!messageEntity) return undefined;

        const messageUpdated = await MessageEntity.create({
            uid: data.uid,
            title: data.title,
            description: data.description,
            uidUser: data.uid_user,
        });

        await messageUpdated.save();

        return this.mapperFromEntityToModel(messageUpdated);
    }

    async getMessage(uid: string): Promise<Message | undefined> {
        const messageEntity = await MessageEntity.findOne(uid, {
            select: ["title", "description", "uid"],
        })

        if (!messageEntity) return undefined;

        return this.mapperFromEntityToModel(messageEntity);
    }

    async getMessages(uid_user: string): Promise<Message[]> {
        const messageEntities = await MessageEntity.find({
            where: { uidUser: uid_user },
        });

        return messageEntities.map(messageEntity => this.mapperFromEntityToModel(messageEntity));
    }

    async deleteMessage(uid: string, uid_user:string): Promise<Message | undefined> {
        const messageEntity = await MessageEntity.findOne(uid, {
           where: { uidUser: uid_user },
        })
    

        if (!messageEntity) return undefined;

        await MessageEntity.remove(messageEntity);

        return this.mapperFromEntityToModel(messageEntity);
    }

    private mapperFromEntityToModel(entity: MessageEntity): Message {
        return {
            uid: entity.uid,
            title: entity.title,
            description: entity.description,
            uid_user: entity.uidUser,
        }
    }

}