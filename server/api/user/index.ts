import { AppDataSource } from "~/src/data-source";
import { userAuth } from "~/src/entity/auth/user.entity";

export default defineEventHandler(async (event) => {
    const userRepo = AppDataSource.getRepository(userAuth);
    const allUser = await userRepo.find({});

    return allUser;
})