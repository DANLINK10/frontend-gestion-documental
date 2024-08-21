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
        <DataTableCarreras :key="selectedCarId" :carId="selectedCarId" />
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
</script>

<style scoped></style>
