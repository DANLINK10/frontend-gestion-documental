// composables/useStudentSearch.ts
import { ref } from 'vue';
import { searchEstudiante } from '@/indexed-db/estudiantes-db';
import type { GlobalEstudianteResponse } from '@/indexed-db/interfaces/global-estudiantes-response';

export function useStudentSearch() {
  const studentData = ref<GlobalEstudianteResponse | null>(null);
  const error = ref<string | null>(null);

  const searchStudent = async (identificacion: string) => {
    studentData.value = null;
    error.value = null;

    try {
      const [result] = await searchEstudiante(identificacion);
      if (result) {
        studentData.value = result;
      } else {
        error.value = 'No se encontró al estudiante';
      }
    } catch {
      error.value = 'Error al buscar el estudiante';
    }
  };

  return {
    studentData,
    error,
    searchStudent
  };
}