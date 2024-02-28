<template>
    <!-- <UButton @click="signIn('credentials', { callbackUrl: '/', username: 'jsmith', password: 'hunter2' })">SIGN</UButton>
    <UButton @click="signIn('github', { callbackUrl: '/' })">github</UButton> -->
    <!-- <UButton @click="signIn('yandex', { callbackUrl: '/' })">Yandex</UButton> -->
    <div>{{ status }}</div>
    <!-- <UButton @click="signOut">LogOut</UButton> -->
  
    INDEX VUE
    <!-- <NuxtLink to="/login">login comp</NuxtLink> -->
    <div>
        {{ data }}
    </div>
</template>

<script setup>
    definePageMeta({ auth: false })
    const { status, data, signIn, signOut } = useAuth();

</script>