<template>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-md">
        <div class=" px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <UForm class="space-y-4" :state="state" @submit="onSubmitNew('/', name, password)">
                <UFormGroup label="Имя" name="name">
                    <UInput v-model="name" />
                </UFormGroup>
                <UFormGroup label="Пароль" name="password">
                    <UInput v-model="password" type="password"/>
                </UFormGroup>
                <UButton type="submit">
                    Войти
                </UButton>
                <UDivider label="или" />
                <div class="mt-6 flex gap-2 justify-center">                    
                    <!-- <AuthSocialButton @click="socialAction('github')" icon="bi:github"/> -->
                    <UButton                        
                        class="w-36 font-normal justify-center"
                        size="sm"
                        color="gray"
                        variant="solid"
                        label="GitHub"
                        :trailing="false"
                        @click="socialAction('github')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
                        GitHub
                    </UButton>
                    <!-- <AuthSocialButton @click="socialAction('google')" icon="bi:google"/> -->
                </div>
                <!-- <div class="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div @click="toggleVariant">
                        {{
                        variant === 'REGISTER' ? 'Уже есть учетная запись?' : 'Нет учетной записи?'
                        }}
                    </div>
                    <div @click="toggleVariant" class="underline cursor-pointer">
                        {{ variant === 'LOGIN' ? 'Создать' : 'Войти' }}
                    </div>
                </div> -->
            </UForm>            
        </div>        
    </div>    
</template>

<script setup lang="ts">
    const { signIn } = useAuth();

    const state = reactive({
        name: undefined,
        password: undefined,
    })

    const isLoading = ref(false);
    const name = ref('');
    const email = ref('');
    const password = ref('');
    type VARIANT = 'LOGIN' | 'REGISTER';
    const variant = ref<VARIANT>('LOGIN');

    async function onSubmitNew(callback:string, username:string, userpassword:string) {
        signIn('credentials', { callbackUrl: callback, username: username, password: userpassword });
    }

    const onSubmit = async () => {
    if (variant.value === 'REGISTER') {
        try {
        isLoading.value = true;
        const { data, error } = await useFetch('/api/auth/register', {
            method: 'POST',
            body: {
                name: name.value,
                password: password.value,
                email: email.value,
            },
        });
        if (error.value) {
            console.log(error.value);
        }
        if (data.value) {
            console.log('Successfully Registered');
        }
        } catch (error) {
        } finally {
            isLoading.value = false;
        }
    } else {
        try {
        isLoading.value = true;

        const result = await signIn('credentials', {
            password: password.value,
            email: email.value,
            // redirect: false,
            callbackUrl: '/',
        });
        if (result?.ok && !result.error) {
            console.log('Successfully LoggedIn');
        } else {
            console.log('Something Weent Wrong');
        }
        } catch (error) {
        } finally {
        isLoading.value = false;
        }
    }
    };

    const socialAction = async (action: string) => {
        // isLoading.value = true;
        //await signIn(action, { redirect: false });
        await signIn(action, { callbackUrl: '/' });
    };

    const toggleVariant = () => {
        if (variant.value === 'REGISTER') {
            variant.value = 'LOGIN';
        } else {
            variant.value = 'REGISTER';
        }
    };
</script>