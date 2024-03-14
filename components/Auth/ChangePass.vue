<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                Current login as: <strong>{{ selectedUser.username }}</strong>, change password
            </template>
            <UForm @submit="saveNewPassword(password)" class="space-y-2">
                <UFormGroup label="Old Pass">
                    <UInput v-model="password.old" type="password" />
                </UFormGroup>
                <UFormGroup label="New Pass">
                    <UInput v-model="password.new" type="password"/>
                </UFormGroup>
                <UFormGroup label="Repeat Pass">
                    <UInput v-model="password.new_repeat" type="password"/>
                </UFormGroup>
                <UFormGroup>
                    <UButton type="submit" class="mr-2">Save</UButton>
                    <UButton @click="closeModal">Cancel</UButton>
                </UFormGroup>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">

    const userStore = useUserStore();
    const isOpen = ref(false);
    const selectedUser = ref({});    
    const password = ref({});
    
    

    async function openChangePassForm(item:any) {
        selectedUser.value = item
        isOpen.value = true
    };

    async function saveNewPassword(item:any) {
        // console.log(item)        
        // const userAuth = await userStore.getUserByID(selectedUser.value.uid)
        // console.log(userAuth.value.user?.password)
        if (item.new_repeat === item.new) {
            await userStore.changePassword(selectedUser.value.uid, item.old, item.new);
        } else {
            console.log('incorrect new pass/repeat check!')
        }        
        
        closeModal();
    }

    async function closeModal () {        
        selectedUser.value = {};
        password.value = {};
        isOpen.value = false;
    };

    defineExpose({
        openChangePassForm,
    })
</script>