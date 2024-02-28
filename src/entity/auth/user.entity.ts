import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: "auth_user",
    schema: "dbo"
})

export class userAuth {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "nvarchar", length: 128, nullable: false })
    password: string

    @Column({ type: "datetime", nullable: true })
    last_login: Date

    @Column({ type: "bit", nullable: false })
    is_superuser: number

    @Column({ type: "nvarchar", length: 150, nullable: false })
    username: string

    @Column({ type: "nvarchar", length: 150, nullable: false })
    name: string

    @Column({ type: "nvarchar", length: 150, nullable: false })
    last_name: string

    @Column({ type: "nvarchar", length: 254, nullable: false })
    email: string

    @Column({ type: "bit", nullable: false })
    is_staff: number

    @Column({ type: "bit", nullable: false })
    is_active: number

    @Column({ type: "datetime", nullable: false })
    date_joined: Date

    @Column({ type: "nvarchar", length: 250, nullable: true })
    image: string
}
