<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <AuthForm />
    </div>    
</template>

<script setup>
    definePageMeta({
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/',
        },
    })
</script>