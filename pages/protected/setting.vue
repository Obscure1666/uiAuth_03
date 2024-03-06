<template>
    <div>        
        isAdmin: {{ userRole.isAdmin }}
    </div>
    <div>
        <UButton><NuxtLink to="/protected/user">Users</NuxtLink></UButton>
    </div>
</template>

<script setup>    
    const userRole = userRoleStore();    
    
    
</script>