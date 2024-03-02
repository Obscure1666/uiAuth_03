<template>
    <div>        
        isAdmin: {{ isAdmin }}
    </div>
</template>

<script setup>
    const { data } = useAuth();
    
    const isAdmin = computed(() => data.value.role === "admin" ? true : false)
    
    
    
</script>