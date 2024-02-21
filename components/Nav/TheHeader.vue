<template>
    <div class="flex h-12 w-full bg-slate-200">
        Header
        <ColorScheme>
	        <USelect v-model="$colorMode.preference" :options="[ 'system', 'light', 'dark' ]" />
        </ColorScheme>
    </div>
    
</template>

<script setup>

</script>