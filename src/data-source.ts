import "reflect-metadata";
import { DataSource } from "typeorm";

import { userAuth } from "./entity/auth/user.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "***",
    password: "***",
    database: "TEMP_DB",
    extra: {
        trustServerCertificate: true,
        instanceof: "SQLEXPRESS"
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
