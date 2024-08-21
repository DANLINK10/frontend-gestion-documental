<template>
    <div class="flex">
        <!-- Input de búsqueda -->
        <form class="py-2 px-2">
            <label class="sr-only">Búsqueda</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" @input="search" placeholder="Buscar . . ."
                    class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
        </form>
    </div>

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
                <tr v-for="(user, index) in paginatedUsers" :key="user.CAR_ID"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index + 1 }}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                        getPadreNombre(user.CAR_PADREESC) }}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ user.CAR_NOMBRE
                        }}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ user.CAR_ACTIVA
                        }}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button @click="handleTitulacion(user.CAR_ID)"
                            class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-auto dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800">
                            Ver
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
        <span
            class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Mostrando <span class="font-semibold text-gray-900 dark:text-white">{{ showingNumberStartRowsCurrentPage
                }}-{{ showingNumberEndRowsCurrentPage }}</span> de <span
                class="font-semibold text-gray-900 dark:text-white">{{ totalRows }}</span>
        </span>
        <div class="flex flex-col">
            <ul class="inline-flex flex-wrap items-center py-5 -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <span
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        @click="onChangeCurrentPage(1)">Inicio</span>
                </li>
                <li>
                    <span
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        @click="onBeforeCurrentPage">Anterior</span>
                </li>
                <li v-for="item in getPaginationArray(totalPages)" :key="item">
                    <span
                        :class="['flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white', currentPage == item ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white' : 'bg-white']"
                        @click="onChangeCurrentPage(item)">{{ item }}</span>
                </li>
                <li>
                    <span
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        @click="onNextCurrentPage">Siguiente</span>
                </li>
                <li>
                    <span
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        @click="onChangeCurrentPage(totalPages)">Fin</span>
                </li>
            </ul>
        </div>
    </nav>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TitulacionResposeType } from '../types/titulacion';


const searchQuery = ref<string>('');

const props = defineProps({
    titulacionData: {
        type: Array as () => TitulacionResposeType[],
        required: false
    }
});

const emit = defineEmits<{
    (e: 'showDetails', id: number): void;
}>();

const extracionHeaders = () => {
    const selectedKeys = ['NOMBRE', 'CARRERA', 'ACTIVA'];
    return selectedKeys;
};

const getPadreNombre = (padreId: number) => {
    const padre = props.titulacionData?.find(padre => padre.CAR_ID === padreId);
    return padre ? padre.CAR_NOMBRE : 'N/A';
};

const handleTitulacion = (carId: number) => {
   
    emit('showDetails', carId);
};

const filteredUsers = computed(() => {
    const searchTerm = searchQuery.value.toLowerCase();
    return props.titulacionData?.filter(user =>
        (user.CAR_CARRERA === 1) && (
            user.CAR_NOMBRE?.toString().toLowerCase().includes(searchTerm) ||
            user.CAR_CARRERA?.toString().toLowerCase().includes(searchTerm) ||
            user.CAR_ACTIVA?.toString().toLowerCase().includes(searchTerm)
        )
    ) || [];
});

const search = (e: any) => {
    searchQuery.value = e.target.value;
};

const rowsPerPage = ref<number>(5);
const currentPage = ref<number>(1);

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / rowsPerPage.value));
const totalRows = computed(() => filteredUsers.value.length);

const showingNumberStartRowsCurrentPage = computed(() => ((rowsPerPage.value * (currentPage.value - 1)) + 1));
const showingNumberEndRowsCurrentPage = computed(() => {
    return (rowsPerPage.value * currentPage.value > totalRows.value) ? totalRows.value : rowsPerPage.value * currentPage.value;
});

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return filteredUsers.value.slice(start, end);
});

const getPaginationArray = (arrProp: number) => {
    const arr = Array.from({ length: arrProp }, (_, i) => i + 1);
    const maxLength = 7;
    const selectedIndex = arr.indexOf(currentPage.value);
    if (selectedIndex === -1) return [];
    const startIndex = Math.max(0, selectedIndex - Math.floor((maxLength - 1) / 2));
    const endIndex = Math.min(arr.length, startIndex + maxLength);
    return arr.slice(startIndex, endIndex);
};

const onChangeCurrentPage = (page: number) => {
    currentPage.value = page;
};

const onBeforeCurrentPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const onNextCurrentPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<style scoped></style>