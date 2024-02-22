<template>
    <header class="flex sticky top-0 z-50 items-center justify-around text-center h-12 w-full bg-slate-200 dark:bg-slate-700">
        <div class="basis-1/5 lg:hidden">
            <div class="flex justify-center resize-none">
                Logo
            </div>            
        </div>
        <div class="basis-1/5 lg:block hidden">
            <div class="flex justify-center resize-none">
                Full Header Logo
            </div>            
        </div>

        <div class="basis-3/5 lg:hidden ">
            <div class="menu flex justify-end">
                <UDropdown :items="mainMenu" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-end' }">
                    <UButton class="w-24 justify-center" icon="i-heroicons-bars-3"/>
                    <template #item="{ item }">
                        <span>{{ item.name }}</span>
                        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                    </template>
                </UDropdown>
            </div>
        </div>
        <div class="basis-3/5 lg:block hidden ">            
            <div class="menu flex justify-between">
                <div class="" v-for="itemMenu in mainMenu" >
                    <div v-for="item in itemMenu">
                        <UButton :icon="item.icon" :to="item.href">{{ item.name }}</UButton>
                    </div>                    
                </div>
            </div>            
        </div>

        <div class="basis-1/5">
            <div class="flex justify-end">
                <div class="flex items-center">
                    <UAvatar class="mx-2" src="https://avatars.githubusercontent.com/u/112487718?u=f2231edaa03d44032d4d9e854984c72cce6df5f1&v=4" alt="Avatar"  />
                    <UButton
                        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" 
                        @click="isDark = !isDark" 
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"                
                    />
                </div>
            </div>
        </div>
    </header>
    
</template>

<script setup>
    const mainMenu = [
        [{ id: 1, name: 'Home', href: '/', icon: 'i-heroicons-home-20-solid' }],
        [{ id: 2, name: 'Loads', href: '/loads', icon: 'i-heroicons-chart-bar-20-solid' }],
        [{ id: 3, name: 'Orders', href: '/order', icon: 'i-heroicons-rss-20-solid' }],
        [{ id: 4, name: 'Minder', href: '/minder', icon: 'i-heroicons-rocket-launch-20-solid' }],
        [{ id: 5, name: 'Tasker', href: '/task', icon: 'i-heroicons-queue-list' }],
        [{ id: 6, name: 'Refs', href: '/refs', icon: 'i-heroicons-pencil-square' }],
    ];
    const colorMode = useColorMode()
    const isDark = computed({
        get () {
            return colorMode.value === 'dark'
        },
        set () {
            colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
        }
    })
</script>