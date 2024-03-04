export default defineNuxtRouteMiddleware((to, from) => {
    if (!userRoleStore().isAdmin && to.path.split('/')[1] == 'protected') {
        return navigateTo('/needadmin')
    }
})