import { createRouter, createWebHistory } from 'vue-router'
import autenticacionRoutes from '../modules/autenticacion/routes'
import dashboardRoutes from '../modules/dashboard/routes'
import TitulacionDetalleVer from '@/modules/titulacion/pages/TitulacionDetalleVer.vue';

const router = createRouter({
  history: createWebHistory(/*import.meta.env.BASE_URL*/),
  routes: [
    ...autenticacionRoutes,
    ...dashboardRoutes,
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../components/ui/NotFoundComponent.vue')
    },
    {
      path: '/titulacion-detalle-ver/:id',
      name: 'TitulacionDetalleVer',
      component: TitulacionDetalleVer
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const autenticacionLocalStorage = JSON.parse(localStorage.getItem('autenticacion') || '{}')
    if (!autenticacionLocalStorage['loginStatus']) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
