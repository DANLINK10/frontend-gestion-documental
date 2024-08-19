import { useApi } from '@/composables/use-api'
import { useQuery } from '@tanstack/vue-query'
import type { TitulacionResposeType } from '../types/titulacion'

export const useGetTitulacion = (usuId: number) => {
  const query = useQuery({
    queryKey: ['titulacion_usuario_carrera_privilegios', usuId],
    queryFn: async () => {
      const response = await useApi.get<TitulacionResposeType[]>(`titulacion/titulacion_usuario_carrera_privilegios?usuId=${usuId}`);
      return response.data
    }
  })
  return query;
}

