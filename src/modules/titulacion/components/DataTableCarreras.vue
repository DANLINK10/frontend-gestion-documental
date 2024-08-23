<template>
    <div>
        <div class="flex">
            <!-- Input de busqueda -->
            <div class="">
                <form class="py-2 px-2">
                    <label class="sr-only">Búsqueda</label>
                    <div class="relative w-full">
                        <div
                            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" @input="search" placeholder="Buscar . . ."
                            class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </form>
            </div>
            <!-- Dropdown button # Filas -->
            <div class="relative inline-block text-left" ref="dropdownContainer">
                <button @click="toggleDropdown"
                    class="bg-white-700 shadow-lg hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm mx-4 my-2 px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                    type="button">
                    # Filas
                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                <!-- Dropdown menu -->
                <div v-show="isDropdownOpen"
                    class="absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    style="top: 100%; left: 0;">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li v-for="(item, index) in optionsRowsPerPage" :key="index">
                            <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                @click="onChangeRowsPerPage(item); toggleDropdown()">
                                {{ item }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
            <!-- Tabla de estudiantes -->
            <table v-if="filteredEstudiantesCarrera.length"
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="px-6 py-3">No</th>
                        <th v-for="key in headers" :key="key" class="px-6 py-3">{{ key }}</th>
                        <th class="px-6 py-3">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedUsers" :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                            showingNumberStartRowsCurrentPage + index
                            }}</td>
                        <td class="px-4 py-2">{{ item.TITU_CEDULA }}</td>
                        <td class="px-4 py-2">{{ item.TITU_NOMBRES }}</td>
                        <td class="px-4 py-2">{{ item.MODT_NOMBRE }}</td>
                        <td class="px-4 py-2">{{ item.TITU_TITULO }}</td>
                        <td class="px-4 py-2">{{ item.MALLA_NOMBRE }}</td>
                        <td class="px-4 py-2">{{ item.TITU_FECHA_DEF }}</td>
                        <td class="px-4 py-2">{{ item.TITU_SIMILITUD_INF }}</td>
                        <td class="px-4 py-2">{{ item.TITU_ESTADO }}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <button @click="navigateToPage()"
                                class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-auto dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800">
                                Ver
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Mensaje cuando no hay datos -->
            <p v-else class="mt-4 text-gray-600">No hay datos disponibles.</p>
        </div>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
            aria-label="Table navigation">
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
    </div>
</template>

<script setup lang="ts">
import { watch, computed, ref, onMounted, onUnmounted } from 'vue';
import { useGetCarrera } from '../composables/useEstudianteCarrera';
import type { EstudianteCarreraResponseType } from '../types/estudiantesCarrera';
import router from '@/router';

const props = defineProps<{ carId: number }>();
const carId = ref<number>(props.carId);
const estudianteData = ref<EstudianteCarreraResponseType[]>([]);

// Función para actualizar los datos cuando cambie carId
const fetchData = async () => {
    const query = await useGetCarrera(carId.value);
    estudianteData.value = query.data || [];
};

watch(() => carId, () => {
    fetchData();
});

fetchData();

//Busquedad
const searchQuery = ref<string>('');

const search = (e: any) => {
    searchQuery.value = e.target.value;
};

const filteredEstudiantesCarrera = computed(() => {
    const searchTerm = searchQuery.value.toLowerCase();
    return estudianteData.value.filter(user =>
        user.TITU_CEDULA?.toString().toLowerCase().includes(searchTerm) || // Nuevo filtro por TITU_CEDULA
        user.TITU_NOMBRES?.toString().toLowerCase().includes(searchTerm)
        // user.MALLA_NOMBRE?.toString().toLowerCase().includes(searchTerm) ||
        // user.TITU_ARCHIVO?.toString().toLowerCase().includes(searchTerm)
    );
});


//ENCABEZADO DE LA TABLA
const headers = ['CÉDULA', 'NOMBRE', 'MODALIDAD', 'TÍTULO', 'MALLA', 'DEFENSA', 'INFORME TURNITIN', 'EXISTENCIA'];

//PAGINACION 



const optionsRowsPerPage = [5, 10, 15, 20, 25, 30, 50]
const rowsPerPage = ref<number>(optionsRowsPerPage[0])
const onChangeRowsPerPage = (rows: number) => {
    rowsPerPage.value = rows
}

const currentPage = ref<number>(1);
const totalPages = computed(() => Math.ceil(filteredEstudiantesCarrera.value.length / rowsPerPage.value));
const totalRows = computed(() => filteredEstudiantesCarrera.value.length);
const showingNumberStartRowsCurrentPage = computed(() => ((rowsPerPage.value * (currentPage.value - 1)) + 1));
const showingNumberEndRowsCurrentPage = computed(() => {
    return (rowsPerPage.value * currentPage.value > totalRows.value) ? totalRows.value : rowsPerPage.value * currentPage.value;
});
const onChangeCurrentPage = (page: number) => {
    currentPage.value = page;
};

const onBeforeCurrentPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const onNextCurrentPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
const getPaginationArray = (arrProp: number) => {
    const arr = Array.from({ length: arrProp }, (_, i) => i + 1);
    const maxLength = 7;
    const selectedIndex = arr.indexOf(currentPage.value);
    if (selectedIndex === -1) return [];
    const startIndex = Math.max(0, selectedIndex - Math.floor((maxLength - 1) / 2));
    const endIndex = Math.min(arr.length, startIndex + maxLength);
    return arr.slice(startIndex, endIndex);
};

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return filteredEstudiantesCarrera.value.slice(start, end);
});

// Estado del dropdown
const isDropdownOpen = ref(false);
const dropdownContainer = ref();

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};
const handleClickOutside = (event: MouseEvent) => {
    if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
        isDropdownOpen.value = false;
    }
};
onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});

//NAVERGAR A OTRA PAGINA 
const navigateToPage = () => {
  window.open('/titulacion-detalle-ver/', '_blank');
};

</script>

<style scoped></style>
