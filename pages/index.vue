<template>
    INDEX VUE
    <div>
        <pre v-if="status"><span>Status:</span> {{ status }}</pre>
        <pre v-if="data"><span>Data:</span> {{ data }}</pre>
        <pre v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre>
        <pre v-if="providers"><span>Providers:</span> {{ providers }}</pre>
        <!-- <pre v-if="session"><span>Session:</span> {{ session }}</pre> -->
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ auth: false })
    const { status, data, getCsrfToken, getProviders, getSession, signIn, signOut, } = useAuth();
    const providers = await getProviders()
    const csrfToken = await getCsrfToken()
    // const session = await getSession()
    
</script>