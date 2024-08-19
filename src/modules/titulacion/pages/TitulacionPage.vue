<!-- TitulacionPage.vue -->
<template>
  <DashboardLayout>
    <div>
      <!-- Encabezado para la primera tabla -->
      <h3 class="text-2xl font-bold text-gray-800 mb-4">Titulación Carreras</h3>

      <!-- Primera tabla -->
      <div v-if="isLoading">Loading...</div>
      <div v-if="error">Error: {{ error.message }}</div>
      <DataDemo v-if="data" :titulacionData="data" @showDetails="handleShowDetails" />

      <!-- Segunda tabla -->
      <div>
        <div v-if="isLoading">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <DataTableCarreras v-if="selectedCarId" :carId="selectedCarId" />
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

// Get user ID from store
const userStore = useAutenticacionStore();
const usuId = userStore.usuId;

// Fetch data using composable
const { data, error, isLoading } = useGetTitulacion(usuId);

// Reactive variable to store the selected CAR_ID
const selectedCarId = ref<number | null>(null);

// Handle the event from DataDemo.vue
const handleShowDetails = (carId: number) => {
  selectedCarId.value = carId;
};
</script>

<style scoped></style>
