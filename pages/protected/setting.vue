<template>
    <div>        
        isAdmin: {{ userRole.isAdmin }}
    </div>
</template>

<script setup>    
    const userRole = userRoleStore();    
    // if (userRole.isAdmin == false) { await navigateTo('/needadmin') }
    
</script>