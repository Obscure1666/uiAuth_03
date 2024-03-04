import { defineStore } from "pinia";

export const userRoleStore = defineStore('user-role',() => {
    const { data, status } = useAuth()
    if (status.value == 'authenticated') {
        const isAdmin = (computed(() => data.value.role === "admin" ? true : false)).value
        return { isAdmin }
    } else {
        const isAdmin = (computed(() => false)).value
        return {isAdmin}
    }
    

   
}) 