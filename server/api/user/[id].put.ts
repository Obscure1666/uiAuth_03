import { AppDataSource } from "~/src/data-source";
import { userAuth } from "~/src/entity/auth/user.entity";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const user = await AppDataSource.getRepository(userAuth).findOneBy({ id: parseInt(event.context.params.id) as number });
    AppDataSource.getRepository(userAuth).merge(user, body);
    const results = await AppDataSource.getRepository(userAuth).save(user);

    return { results };
})