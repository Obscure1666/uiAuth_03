import { AppDataSource } from "~/src/data-source";
import { userAuth } from "~/src/entity/auth/user.entity";

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id) as number;
    const user = await AppDataSource.getRepository(userAuth).findOneBy({
        id: parseInt(event.context.params.id) as number
    });    
    
    await AppDataSource.createQueryBuilder()
        .update(userAuth)
        .set({ is_active: !user?.is_active })
        .where("id = :id", { id: id })
        .execute();

    
    return { user }
})