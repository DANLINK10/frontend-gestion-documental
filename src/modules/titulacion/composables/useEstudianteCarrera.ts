import { useApi } from '@/composables/use-api';
import { useQuery } from '@tanstack/vue-query';
import type { EstudianteCarreraResponseType } from '../types/estudiantesCarrera';

export const useGetCarrera = (CAR_ID: number) => {
  return useQuery<EstudianteCarreraResponseType[]>({
    queryKey: ['titulacion_por_carrera', CAR_ID],
    queryFn: async () => {
      const response = await useApi.get<EstudianteCarreraResponseType[]>(`titulacion/titulacion_por_carrera?idCarrera=${CAR_ID}`);
      return response.data;
    },
    enabled: !!CAR_ID
  });
};