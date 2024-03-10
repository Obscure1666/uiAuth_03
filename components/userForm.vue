<template>    
    <div>
        <UModal v-model="isOpen">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    {{ selectedUser.id ? 'Edit Profile (temporary unavialable)' : 'New Record' }}
                </template>

                <UForm class="space-y-2" :state="state" @submit="userFormSubmit(selectedUser)">
                    <UFormGroup label="Login">
                        <UInput :disabled v-model="selectedUser.username" />
                    </UFormGroup>
                    <UFormGroup label="Password">
                        <UInput :disabled :ui="{ icon: { trailing: { pointer: '' } } }" type="password" v-model="selectedUser.password">
                                <template #trailing>
                                    <UButton color="gray" :padded="false" icon="i-heroicons-sparkles" />
                                </template>
                        </UInput>                        
                    </UFormGroup>
                    
                    <UFormGroup label="First Name">
                        <UInput v-model="selectedUser.first_name" />
                    </UFormGroup>
                    <UFormGroup label="Last Name">
                        <UInput v-model="selectedUser.last_name" />
                    </UFormGroup>
                    <UFormGroup label="E-mail">
                        <UInput type="email" v-model="selectedUser.email" />
                    </UFormGroup>
                    <UFormGroup label="Avatar Image">
                        <UInput :ui="{ icon: { trailing: { pointer: '' } } }"  v-model="selectedUser.image">
                            <template #trailing>
                                <UButton color="gray" :padded="false" icon="i-heroicons-folder-arrow-down" />
                            </template>
                        </UInput>
                        
                    </UFormGroup>
                    <UFormGroup label="Role">
                        <USelect :disabled v-model="selectedUser.role" :options="userRole"/>                        
                    </UFormGroup>
                    <UButton type="submit">Submit</UButton>
                    <UButton @click="closeModal">Cancel</UButton>
                </UForm>                
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
    const toast = useToast();
    const userStore = useUserStore();
    const isOpen = ref(false);
    const selectedUser = ref({});
    const disabled = ref(false);
    
    const userRole = ['guest', 'user', 'admin'];

    const state = reactive({
        email: undefined,
        password: undefined
    });
    
    async function openUserForm(item:any) {
        selectedUser.value = {};
        disabled.value = false;
        if (item) {
            disabled.value = true;
            selectedUser.value = item;        
        } else {
            
        }
        isOpen.value = true
    };

    function closeModal () {
        isOpen.value = false;
    }

    async function userFormSubmit(user:any) {
        if (user.id) {
            // update record
            toast.add({title: 'TO-DO', description: 'Insert here save Profile changing'})
        } else {
            // create record
            await userStore.createNewUser(user.username, user.password, user.email, Date(), Date(), user.first_name, user.last_name, 1, user.image, user.accessToken, user.role, 1);
        };        
        closeModal();        
    }

    defineExpose({
        openUserForm,
    })
</script>