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
        async getUserByID(id:number) {
            const { data: userList }:any = await useFetch(`/api/user/${id}`);
            return userList as UserList[];
        },
        async getAdminCount() {
            const { data } = await useFetch(`/api/user/cntadmin`);
            return data;
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
        async changePassword(id:number, oldPass:string, newPass:string) {
            await $fetch(`/api/user/cngpass/query?id=${id}&oldpass=${oldPass}&newpass=${newPass}`, {
                method: "PUT"
            })
            .then(async () => {                
                // console.log('Updated.');
            }).catch((e) => {
                console.log(e.data.message);
            })
        },
        async changeActive(id:number) {
            await $fetch(`/api/user/setactive/${id}`, {
                method: "PUT"
            })
            .then(async () => {   
                await this.getAllUsers();             
                // console.log('Updated.');
            }).catch((e) => {
                console.log(e.data.message);
            })
        },
        async remove(id: string) {
            await $fetch(`/api/user/${id}`, {
                method: 'DELETE'
            }).then(async () => {
                await this.getAllUsers();
                console.log('Deleted');
            }).catch((e) => {
                console.log(e.data.message);
            })
        },
    },
});

