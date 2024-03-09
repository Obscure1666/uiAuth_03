<template>
    <div>
        <UButton @click="userForm.openUserForm()">Add New</UButton>        
    </div>
    <UserForm ref="userForm" />
    <div>
        <UTable
            :columns="columns"    
            :rows="userList"            
        >
            <template #is_active-data="{ row }">
                <UCheckbox disabled v-model="row.is_active" />
            </template>
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>
    <!-- Confirm delete row modal window -->
    <div>
        <UModal v-model="deleteUserIsOpen">
            <UAlert
                title="Подтверждение удаления пользователя:" 
                :description="confirmRow.username" 
                :actions="[
                    { variant: 'solid', color: 'primary', label: 'Удалить запись?', click: () => { deleteRow(confirmRow) } }, 
                    { variant: 'outline', color: 'primary', label: 'Отмена', click: () => { deleteUserIsOpen = false } }
                ]"
            >
                               
            </UAlert>
        </UModal>
    </div>
</template>

<script setup lang="ts">
    const toast = useToast();
    const userStore = useUserStore();
    const userList = await userStore.getAllUsers();
    
    const userForm = ref();
    const deleteUserIsOpen = ref(false);

    const columns = [
        { key: 'id', label: 'ID' },        
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last_Name' },
        { key: 'email', label: 'E-Mail' },
        { key: 'role', label: 'Role' },
        { key: 'is_active', label: 'Active' },
        { key: 'last_login', label: 'Last Login' },
        { key: 'actions', label: 'Actions' },
    ];

    const items = (row:any) => [
        [{
            label: 'Edit Profile',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => { userForm.value.openUserForm(row) },
        }, {
            label: 'Active/Inactive',
            icon: 'i-heroicons-document-duplicate-20-solid'
        }], [{
            label: 'Archive',
            icon: 'i-heroicons-archive-box-20-solid'
        }, {
            label: 'Move',
            icon: 'i-heroicons-arrow-right-circle-20-solid'
        }], [{
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => { openConfirmDeleteModal(row) },
        }]
    ];

    const confirmRow = ref();
    const openConfirmDeleteModal = (item:any) => {
        confirmRow.value = item;
        deleteUserIsOpen.value = true;
    };
    
    async function deleteRow(deleteItem) {
        const admin = await userStore.getAdminCount();
        
        if (admin.value > 1) {
            userStore.remove(deleteItem.id);        
        } else {
            console.log('Can`t delete last record with admin roles!')
        }
        deleteUserIsOpen.value = false;
        toast.add({ title: 'Record Deleted!' });        
    };
</script>