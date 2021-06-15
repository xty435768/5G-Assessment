import { createRouter, createWebHistory } from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import Index from '../components/Index'
import Home from '../components/home/Home'
import Detail from '../components/Detail'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/index',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/detail',
        name: 'Detail',
        component: Detail
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
