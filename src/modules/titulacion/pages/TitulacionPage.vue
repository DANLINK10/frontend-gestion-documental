<template>
  <DashboardLayout>
    <div>
      <!-- Encabezado para la primera tabla -->
      <h3 class="text-2xl font-bold text-gray-800 mb-4">Titulación Carreras</h3>

      <!-- Primera tabla -->

      <DataDemo v-if="query.isSuccess" :titulacionData="query.data.value" @showDetails="mostrarDetalles" />

      <!-- Muestra los detalles de la carrera seleccionada aquí si es necesario -->
      <div class="flex items-center space-x-2">
        <p class="text-2xl font-bold text-gray-800">Titulación:</p>
        <p v-if="carreraSeleccionada" class="text-2xl font-bold text-gray-800">
          {{ carreraSeleccionada.CAR_NOMBRE }}
        </p>
        <p v-if="!carreraSeleccionada" class="text-2xl text-gray-500">
          No hay carrera seleccionada.
        </p>
      </div>
      <!-- Segunda tabla, usando una key para forzar la recreación -->
      <div v-if="selectedCarId !== null && selectedCarId > 0">
        <button type="button" @click="handleOpenModal"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          AGREGAR
        </button>
        <DataTableCarreras :key="selectedCarId" :carId="selectedCarId" />
      </div>
      <div>
        <CreateTitulacionModal :show="showModal" @close="handleCloseModal" @save="handleSaveStudent" />

      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import DataDemo from '../components/DataDemo.vue';
import DataTableCarreras from '../components/DataTableCarreras.vue';
import { useGetTitulacion } from '../composables/useTitulacion';
import { useAutenticacionStore } from '@/stores/use-autenticacion.store';
import { ref } from 'vue';
// import type { EstudianteCarreraResponseType } from '../types/estudiantesCarrera';
import type { TitulacionResposeType } from '../types/titulacion';

import CreateTitulacionModal from '../components/CreateTitulacionModal.vue'; //importar el modal

const userStore = useAutenticacionStore();
const usuId = userStore.usuId;
const query = useGetTitulacion(usuId);

const carreraSeleccionada = ref<TitulacionResposeType>();  // Inicialmente no hay carrera seleccionada
const selectedCarId = ref<number | null>(null);  // Inicialmente no hay ningún ID seleccionado

const mostrarDetalles = (id: number) => {
  if (query.data.value) {
    console.log("mostrar detalles:", id, query.data.value)
    carreraSeleccionada.value = query.data.value.find(carrera => carrera.CAR_ID === id);
    selectedCarId.value = id;  // Actualiza el ID de la carrera seleccionada
  }
};

// acciones del modal crear titulacion 
const showModal = ref(false);
const handleOpenModal = () => {
  showModal.value = true;
};
const handleCloseModal = () => {
  showModal.value = false;
};


</script>

<style scoped></style>
