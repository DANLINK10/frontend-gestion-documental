<template>
  <div v-if="show"
    class="fixed top-0 left-0 sm:ml-32 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
    @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Agregar Estudiante</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-gray-700">Cédula</label>
          <input v-model="identificacion" @input="handleInput" type="text" placeholder="Ingrese cédula de identidad"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Estudiante</label>
          <input v-model="estudiante" type="text" placeholder="Nombre del estudiante"
            class=" cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            readonly />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Modalidad</label>
          <select v-model="modalidad" @change="handleModalidadChange"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option value="">Seleccione una modalidad</option>
            <option value="Modalidad1">Trabajo de Titulación</option>
            <option value="Modalidad2">Examen Complexivo</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Título</label>
          <input v-model="titulo" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required />
        </div>
        <div v-if="modalidad" class="mb-4">
          <label class="block text-gray-700">Malla</label>
          <div>
            <label v-for="year in years" :key="year" class="inline-flex items-center mr-4">
              <input type="radio" :value="year" v-model="malla" />
              <span class="ml-2">{{ year }}</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" @click="closeModal"
            class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStudentSearch } from "../composables/useEstudianteSearch";


const emit = defineEmits(['close', 'save'])
const props = defineProps({
  show: Boolean,
});

const cedula = ref('');

const modalidad = ref('');
const malla = ref('');
const titulo = ref('');
const years = ref([]);

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  const newStudent = {
    cedula: cedula.value,
    estudiante: estudiante.value,
    modalidad: modalidad.value,
    malla: malla.value,
    titulo: titulo.value,
  };
  emit('save', newStudent);
  closeModal();
};

const handleModalidadChange = () => {
  if (modalidad.value) {
    years.value = ['2008', '2009', '2010', '2011', '2012', '2013', '2014']; // Puedes ajustar esto según tus necesidades
  } else {
    years.value = [];
  }
};

watch(() => props.show, (newVal) => {
  if (!newVal) {
    cedula.value = '';
    estudiante.value = '';
    modalidad.value = '';
    malla.value = '';
    titulo.value = '';
    years.value = [];
  }
});

//buscar por cedula
const estudiante = ref('');
const { studentData, error, searchStudent } = useStudentSearch();
const identificacion = ref("")
const handleInput = async () => {
  identificacion.value = identificacion.value.replace(/\D/g, '').slice(0, 10);

  if (identificacion.value.length === 10) {
    await searchStudent(identificacion.value);

    if (studentData.value) {
      estudiante.value = `${studentData.value.NOMBRES} ${studentData.value.APELLIDOS}`;
      error.value = '';
    } else {
      estudiante.value = 'NO EXISTE EL ESTUDIANTE.';
    }
  }
};
</script>

<style scoped>
.fixed {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
