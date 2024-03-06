<template>
    INDEX VUE
    <div class="m-2 p-2 border-2">
        Шаблон для дальнейшего использования
    </div>
    <div class="flex font-normal text-sm space-x-4 ">
        <pre class="bg-slate-400 rounded-lg p-1" v-if="status"><span>Status:</span> {{ status }}</pre>
        <pre class="bg-slate-400 rounded-lg p-1" v-if="data"><span>Data:</span> {{ data }}</pre>
        <pre class="bg-slate-400 rounded-lg p-1" v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre>
        <pre class="bg-slate-400 rounded-lg p-1" v-if="providers"><span>Providers:</span> {{ providers }}</pre>
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