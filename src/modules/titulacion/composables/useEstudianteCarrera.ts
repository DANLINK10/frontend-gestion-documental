import { useApi } from '@/composables/use-api';
// import { useQuery } from '@tanstack/vue-query';
import type { EstudianteCarreraResponseType } from '../types/estudiantesCarrera';

export const useGetCarrera =async (CAR_ID: number) => {
  const response = await useApi.get<EstudianteCarreraResponseType[]>(`titulacion/titulacion_por_carrera?idCarrera=${CAR_ID}`);
  return response
};




