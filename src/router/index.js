import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChildRenView from '../views/HeaderView.vue'
import PostView from '../views/PostView.vue'
import OtherSpace from '../views/user-space/UserSpace.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    porps: true,
  },
  {
    path: '/userspace/:id',
    name: 'userSpace',
    component: OtherSpace,
    porps: true,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    children: [
      {
        path: '/children',
        name: 'children',
        component: ChildRenView
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history', 
  routes
})

export default router
