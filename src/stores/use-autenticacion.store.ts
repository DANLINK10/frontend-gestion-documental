import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAutenticacionStore = defineStore(
    'autenticacion',
    () => {
        const loginStatus = ref(false)
        const nombre = ref('')
        const rolId = ref(-1)
        const usuId = ref(-1)

        const showModal = ref(false)
        const messageError = ref('')
        const titleError = ref('')

        const rutas = ref([])

        const onLogginSuccess = (
            success: boolean,
            nombreParam?: string,
            rolIdParam?: number,
            message?: string,
            usuIdR?:number
        ) => {
            if (success === true) {
                loginStatus.value = true
                nombre.value = nombreParam ? nombreParam : ''
                usuId.value = usuIdR ? usuIdR : -1
                rolId.value = rolIdParam ? rolIdParam : -1
                messageError.value = ''
                titleError.value = ''
                showModal.value = false
            } else {
                showModal.value = true
                messageError.value = message ?? '-'
                titleError.value = 'Error'
                loginStatus.value = false
            }
        }

        const onLogginError = (error?: string) => {
            showModal.value = true
                ; (messageError.value = error ? error : 'Error al iniciar sesión'),
                    (titleError.value = 'Error')
            loginStatus.value = false
        }
        const closeModal = () => {
            showModal.value = false
        }

        const onLogout = () => {
            loginStatus.value = false
            nombre.value = ''
            rolId.value = -1
        }

        const updateRutas = (rutasParam: any) => {
            rutas.value = rutasParam
        }

        return {
            // state
            loginStatus,
            nombre,
            rolId,
            usuId,
            showModal,
            messageError,
            titleError,
            // actions
            onLogginSuccess,
            onLogginError,
            closeModal,
            onLogout,
            updateRutas
        }
    },
    {
        persist: true
    }
)