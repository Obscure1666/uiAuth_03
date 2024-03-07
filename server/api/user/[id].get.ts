import { AppDataSource } from "~/src/data-source";
import { userAuth } from "~/src/entity/auth/user.entity";

export default defineEventHandler(async (event) => {
    const user = await AppDataSource.getRepository(userAuth).findOneBy({
        id: parseInt(event.context.params.id) as number
    });
    return { user }
})