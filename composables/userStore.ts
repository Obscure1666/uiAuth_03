import { defineStore } from "pinia";


interface UserList {
    id: number
    username: string
    password: string
    email: string
    date_joined: Date
    last_login: Date
    first_name: string
    last_name: string
    is_active: number
    image: string
    accessToken: string
    role: string
    role_id: number
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userList: [] as UserList[],
    }),
    actions: {
        async getAllUsers() {
            const { data: userList }:any = await useFetch(`/api/user`);
            return userList as UserList[];
        },
        async createNewUser(username: string, password: string, email: string, date_joined: Date, last_login: Date, first_name: string, last_name: string, is_active: number, image: string, accessToken: string, role: string, role_id: number) {
            await $fetch(`/api/user`, {
                method: 'POST',
                body: { username, password, email, date_joined, last_login, first_name, last_name, is_active, image, accessToken, role, role_id }
            })
            .then(async ()=> {
                await this.getAllUsers();
                console.log('Запись добавлена: ');
            })
            .catch((e) => {
                console.log(e.data.message);
            });
        },        
    },
});

