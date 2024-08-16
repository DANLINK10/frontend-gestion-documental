<template>
  <DashboardLayout>
    <div>
      <!-- Encabezado para la primera tabla -->
      <h3 class="text-2xl font-bold text-gray-800 mb-4">Titulación Carreras</h3>

      <!-- Primera tabla -->
      <div v-if="isLoading">Loading...</div>
      <div v-if="error">Error: {{ error.message }}</div>
      <DataDemo v-if="data" :data="query.data.value" @updateRow="handleView" @openModal="handleOpenModal"
        @openDefensaModal="handleOpenDefensaModal" />


      <!-- Mostrar la segunda tabla si showSecondTable es verdadera -->
      <div v-if="showSecondTable">
        <DataDemo :data="dataTitulo" :savedPDFs="savedPDFs" @openModal="handleOpenModal" @viewPDF="viewPDF"
          :action="navigateToPage" @openDefensaModal="handleOpenDefensaModal" />
      </div>
    </div>

    <!-- Modales -->
    <CreateTitulacionModal :show="showModal" @close="closeModal" @save="saveStudent" />
    <CreateInformeModal :show="showInformeModal" :data="selectedRowData" @close="closeInformeModal"
      @save="saveInforme" />
    <CreateRegistroDefensaModal :show="showDefensaModal" :data="selectedRowData" @close="closeDefensaModal"
      @save="saveDefensa" />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import DataDemo from '../components/DataDemo.vue';
import CreateTitulacionModal from '../components/CreateTitulacionModal.vue';
import CreateInformeModal from '../components/CreateInformeModal.vue';
import CreateRegistroDefensaModal from '../components/CreateRegistroDefensaModal.vue';
import { dataTitulo } from '../dto/myData';
import router from '@/router';

const showModal = ref(false);
const showInformeModal = ref(false);
const showDefensaModal = ref(false);
const selectedRowData = ref(null);
const showSecondTable = ref(false); // Nueva variable de estado

// Obtener el id del login
import { useGetTitulacion } from '../composables/useTitulacion';
import { useAutenticacionStore } from '@/stores/use-autenticacion.store';
const userStore = useAutenticacionStore();
const usuId = userStore.usuId;
const query = useGetTitulacion(usuId);
const { data, error, isLoading } = useGetTitulacion(usuId);

// Abrir y cerrar modales
const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveStudent = (newStudent: any) => {
  console.log('Estudiante guardado:', newStudent);
};

const handleView = (emitId: number) => {
  console.log('ID recibido:', emitId);
  const row = dataTitulo.find(item => item.numero === emitId);

  if (row) {
    console.log('Datos recibidos:', row);
    showSecondTable.value = true; // Muestra la segunda tabla
  } else {
    showSecondTable.value = false; // Oculta la segunda tabla si no hay datos
  }
};

const handleOpenModal = (row: any) => {
  selectedRowData.value = row;
  showInformeModal.value = true;
};

const handleOpenDefensaModal = (row: any) => {
  selectedRowData.value = row;
  showDefensaModal.value = true;
};

const closeInformeModal = () => {
  showInformeModal.value = false;
};

const closeDefensaModal = () => {
  showDefensaModal.value = false;
};

const saveInforme = (informeData: any) => {
  console.log('Informe guardado:', informeData);
  if (informeData.pdfContent && informeData.cedula) {
    savedPDFs.value[informeData.cedula] = informeData.pdfContent;
  }
  closeInformeModal();
};

const saveDefensa = (defensaData: any) => {
  console.log('Defensa guardada:', defensaData);
  if (defensaData.pdfContent && defensaData.cedula) {
    savedPDFs.value[defensaData.cedula] = defensaData.pdfContent;
  }
  closeDefensaModal();
};

const savedPDFs = ref<{ [key: string]: string }>({});
const viewPDF = (pdfContent: string) => {
  const win = window.open("", "_blank");
  if (win) {
    win.document.write('<iframe src="' + pdfContent + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }
};

const navigateToPage = (row: any) => {
  const id = row.numero || row.cedula;
  router.push(`/titulacion-detalle-ver/${id}`);
};

</script>

<style scoped></style>
