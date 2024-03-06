import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: "auth_user",
    schema: "dbo"
})

export class userAuth {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "nvarchar", length: 150, nullable: false })
    username: string

    @Column({ type: "nvarchar", length: 128, nullable: false })
    password: string

    @Column({ type: "nvarchar", length: 254, nullable: false })
    email: string

    @Column({ type: "datetime", nullable: false })
    date_joined: Date
    
    @Column({ type: "datetime", nullable: false })
    last_login: Date

    @Column({ type: "nvarchar", length: 150, nullable: true })
    first_name: string

    @Column({ type: "nvarchar", length: 150, nullable: true })
    last_name: string

    @Column({ type: "bit", nullable: false })
    is_active: number

    @Column({ type: "nvarchar", length: 250, nullable: true })
    image: string

    @Column({ type: "nvarchar", length: 250, nullable: true })
    accessToken: string

    @Column({ type: "nvarchar", length: 50, nullable: false })
    role: string

    @Column({ type: "int", nullable: true })
    role_id: number
    
}
