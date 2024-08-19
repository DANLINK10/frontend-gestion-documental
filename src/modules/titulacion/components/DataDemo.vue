<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="px-6 py-3">#</th>
                        <th v-for="key in extracionHeaders()" :key="key" class="px-6 py-3">{{ key }}</th>
                        <th class="px-6 py-3">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in filteredUsers" :key="user.CAR_ID"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index + 1
                            }}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                            getPadreNombre(user.CAR_PADREESC) }}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                            user.CAR_NOMBRE }}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                            user.CAR_ACTIVA }}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <button @click="handleTitulacion(user.CAR_ID, user.CAR_NOMBRE)"
                                class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-auto dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800">
                                Ver
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <h3 class="text-2xl font-bold text-gray-800 mt-6 mb-4">Titulación: {{ selectedCarreraName }}</h3>

    </div>


</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TitulacionResposeType } from '../types/titulacion';

const selectedCarreraName = ref('');

const props = defineProps({
    titulacionData: {
        type: Array as () => TitulacionResposeType[],
        required: false // Ajusta esto según tus necesidades
    }
});

const emit = defineEmits<{
    (e: 'showDetails', id: number): void;
}>();


const extracionHeaders = () => {

    const selectedKeys = ['CAR_NOMBRE', 'CAR_CARRERA', 'CAR_ACTIVA_ESCUELA'];

    return selectedKeys;
}
// Obtener el nombre del padre
const getPadreNombre = (padreId: number) => {
    const padre = props.titulacionData?.find(padre => padre.CAR_ID === padreId);
    return padre ? padre.CAR_NOMBRE : 'N/A';
};

// Manejar acción de titulacion
const handleTitulacion = (carId: number, carName: string) => {
    selectedCarreraName.value = carName;
    emit('showDetails', carId); // Emite el evento
    console.log(carId)
};

const searchQuery = ref('');


const filteredUsers = computed(() => {
    const searchTerm = searchQuery.value.toLowerCase();
    return props.titulacionData?.filter(user =>
        (user.CAR_CARRERA === 1) && (
            user.CAR_NOMBRE?.toString().toLowerCase().includes(searchTerm) ||
            user.CAR_CARRERA?.toString().toLowerCase().includes(searchTerm) ||
            user.CAR_ACTIVA?.toString().toLowerCase().includes(searchTerm)
        )
    );
});





</script>


<style scoped></style>