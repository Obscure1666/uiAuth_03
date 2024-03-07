import { AppDataSource } from "~/src/data-source";
import { userAuth } from "~/src/entity/auth/user.entity";

// @ts-ignore
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const id = parseInt(query.id) as number;
    const oldPass = query.oldpass;
    const newPass = query.newpass;

    const userRepository = AppDataSource.getRepository(userAuth);
    const authUser = await userRepository.findOne({
        where: {
            id: id,
        }
    });
    const correctPass = await bcrypt.compare(
        oldPass,
        authUser.password
    );
    if (correctPass) {
        const hashPass = await bcrypt.hash(newPass, 12);
        await AppDataSource.createQueryBuilder().update(userAuth).set({ password: hashPass }).where("id = :id", { id: id }).execute();
        console.log('Pass changed')
        return true
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: 'incorrect old pass'
          })
    }
})