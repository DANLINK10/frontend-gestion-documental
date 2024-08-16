<template>
    <LoginLayout>
        <div>
            <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input v-model="username" type="text" id="username"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your username">
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input v-model="password" type="password" id="password"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password">
                    </div>
                    <div class="flex items-center justify-center">
                        <button type="submit" :class="[
                            query.isPending.value ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700',
                            `w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`
                        ]" :disabled="query.isPending.value">
                            {{ query.isPending.value ? `Enviando...` : `Ingresar` }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </LoginLayout>
    <!-- Modal -->
    <div v-if="store.showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                {{ store.titleError }}
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    {{ store.messageError }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button @click="closeModal" type="button"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginLayout from '../layouts/LoginLayout.vue';
import { useAutenticacionStore } from '@/stores/use-autenticacion.store';
import { useLogin } from '../composables/use-login';
import { useRouter } from 'vue-router';

const store = useAutenticacionStore()
const router = useRouter()
const query = useLogin()

const username = ref<string>();
const password = ref<string>();

const submit = async () => {
    try {
        const { success, nombre, rolId,usuId, message } = await query.mutateAsync(
            { 
                username: username.value, 
                password: password.value 
            }
        )
        if(query.isSuccess && success) {
            store.onLogginSuccess(success, nombre, rolId, message, usuId)
            router.push({ name: 'dashboard', replace: true })
        }
    } catch (error) {
        store.onLogginError(`${error}`)
    }
}

const closeModal = () => {
    store.closeModal()
}
</script>

<style scoped></style>