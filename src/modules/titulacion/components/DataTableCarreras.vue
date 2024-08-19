<!-- DataTableCarreras.vue -->
<template>
    <div>
        <table v-if="filtereEstudiantesCarrera.length > 0" class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th class="px-6 py-3">#</th>
                    <th v-for="key in extracionHeadersCarrera()" :key="key" class="px-6 py-3">{{ key }}</th>
                    <th class="px-6 py-3">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filtereEstudiantesCarrera" :key="index" class="border-b">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index + 1 }}
                    </td>
                    <td class="px-4 py-2">{{ item.TITU_CEDULA }}</td>
                    <td class="px-4 py-2">{{ item.TITU_NOMBRES }}</td>
                    <td class="px-4 py-2">{{ item.MODT_NOMBRE }}</td>
                    <td class="px-4 py-2">{{ item.TITU_TITULO }}</td>
                    <td class="px-4 py-2">{{ item.MALLA_NOMBRE }}</td>
                    <td class="px-4 py-2">{{ item.TITU_FECHA_DEF }}</td>
                    <td class="px-4 py-2">{{ item.TITU_SIMILITUD_INF }}</td>
                    <td class="px-4 py-2">{{ item.TITU_ESTADO }}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button
                            class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-auto dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800">
                            Ver
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-else class="mt-4 text-gray-600">No data available.</p>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGetCarrera } from '../composables/useEstudianteCarrera';

// Define the prop for carId
const props = defineProps<{
    carId: number 
}>();

const searchQuery = ref('');

const { data: estudianteData, isLoading, error } = useGetCarrera(props.carId);

const filtereEstudiantesCarrera = computed(() => {
    const searchTerm = searchQuery.value.toLowerCase();
    return (estudianteData.value || []).filter(user =>
    (
        user.CAR_NOMBRE?.toString().toLowerCase().includes(searchTerm) ||
        user.MALLA_NOMBRE?.toString().toLowerCase().includes(searchTerm) ||
        user.TITU_ARCHIVO?.toString().toLowerCase().includes(searchTerm)
    )
    );
});

const extracionHeadersCarrera = () => {
    const selectedKeysCarreras = ['TITU_CEDULA', 'TITU_NOMBRES', 'MODT_NOMBRE', 'TITU_TITULO', 'MALLA_NOMBRE', 'TITU_FECHA_DEF', 'TITU_SIMILITUD_INF', 'TITU_ESTADO'];
    return selectedKeysCarreras;
};

// Watch for changes in carId prop
watch(() => props.carId, (newCarId) => {
    if (newCarId) {
        // Trigger a refetch or other action when carId changes
    }
});
</script>

<style scoped></style>