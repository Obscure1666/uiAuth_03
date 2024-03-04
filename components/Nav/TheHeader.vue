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
                    <UDropdown 
                        :items="avatarMenu"
                        :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }"
                    >
                        <UAvatar class="mx-2" :src="data?.user?.image" alt="Avatar" />
                        <template #account="{ item }">
                            <div class="text-left">
                                <p>
                                {{ status === 'authenticated' ? 'Зарегистрирован как: ' : 'Зарегистрируйтесь...' }}
                                </p>
                                <p class="truncate font-medium text-gray-900 dark:text-white">
                                {{ item.label }}
                                </p>
                            </div>
                        </template>                       
                        
                        <template #item="{ item }">
                            <span class="truncate">{{ item.label }}</span>
                            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />                            
                        </template>
                        
                    </UDropdown>                       
                    
                    <!-- <UButton
                        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" 
                        @click="isDark = !isDark" 
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"                
                    /> -->
                </div>
            </div>
        </div>
    </header>
    
</template>

<script setup lang="ts">
    const { status, data, signIn, signOut } = useAuth();
    
    const loggedName = data.value?.user?.email;    
    const isAdmin = (computed(() => status.value == 'authenticated'? (data.value.role == "admin" ? false : true) : true)).value;
    
    const colorMode = useColorMode()
    const isDark = computed({
        get () {
            return colorMode.value === 'dark'
        },
        set () {
            colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
        }
    });

    const darkClick = (item:any) => {
        if (item) {
            isDark.value = false
        } else {
            isDark.value = true
        }
    };

    const mainMenu = [
        [{ id: 1, name: 'Home', href: '/', icon: 'i-heroicons-home-20-solid' }],
        [{ id: 2, name: 'Loads', href: '/loads', icon: 'i-heroicons-chart-bar-20-solid' }],
        [{ id: 3, name: 'Orders', href: '/order', icon: 'i-heroicons-rss-20-solid' }],
        [{ id: 4, name: 'Minder', href: '/minder', icon: 'i-heroicons-rocket-launch-20-solid' }],
        [{ id: 5, name: 'Tasker', href: '/task', icon: 'i-heroicons-queue-list' }],
        [{ id: 6, name: 'Reference', href: '/refs', icon: 'i-heroicons-pencil-square' }],
    ];

    // avatarMenu = loginInfoBlock + settingBlock_(Setting+Theme) + docsBlock_(Docs+changeLog+Status) + signBlock
    const loginInfoBlock = [
        [{
            label: loggedName,
            slot: 'account',
            disabled: true
        }]
    ];

    const settingBlock = [
        [{
            label: 'Настройки',            
            icon: 'i-heroicons-cog-8-tooth',            
            click: () => { navigateTo('/protected/setting') },
            // disabled: isAdmin,
        }, {
            label: 'Изменить тему',
            icon: 'i-heroicons-sun-20-solid',
            click: () => { darkClick(isDark) }
        }

    ]];

    const docsBlock = [
        [{
                label: 'Документация',
                icon: 'i-heroicons-book-open'
            }, {
                label: 'Изменения',
                icon: 'i-heroicons-megaphone'
            }, {
                label: 'Статус',
                icon: 'i-heroicons-signal'
        }]
    ];

    const signOutMenu = [
        [{
            label: 'Выйти',
            icon: 'i-heroicons-arrow-right-on-rectangle',
            click: () => { signOutDrop('') }
        }]
    ];
    const signInMenu = [
        [{
            label: 'Войти',
            icon: 'i-heroicons-arrow-left-on-rectangle',
            click: () => { signInDrop('') }
        }]
    ];
    const signBlock = status.value == 'authenticated' ? signOutMenu : signInMenu;

    const avatarMenu = [...loginInfoBlock, ...signBlock, [], ...settingBlock, ...docsBlock]

    const signOutDrop = (item:any) => {
        signOut()
    }
    const signInDrop = (item:any) => {
        navigateTo('/auth/login')
    }
</script>