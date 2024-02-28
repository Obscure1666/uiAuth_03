import { AppDataSource } from "~/src/data-source";
import { userAuth } from "~/src/entity/auth/user.entity";

// @ts-ignore
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    body.password = await bcrypt.hash(body.password, 12);

    const userRepo = AppDataSource.getRepository(userAuth);
    await userRepo.save(body);

    return {body};
})