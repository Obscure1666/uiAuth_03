import "reflect-metadata";
import { DataSource } from "typeorm";

import { userAuth } from "./entity/auth/user.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.SQL_HOST,
    port: parseInt(process.env.SQL_PORT) as number,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    extra: {
        trustServerCertificate: true,
        instanceof: process.env.SQL_INSTANCE,
        },
    synchronize: false,
    logging: false,    
    entities: [
        userAuth
    ],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
.then(() => {
    // here you can start to work with your database
    })
    .catch((error) => console.log(error));
