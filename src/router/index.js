import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChildRenView from '../views/HeaderView.vue'
import PostView from '../views/PostView.vue'
import OtherSpace from '../views/user-space/UserSpace.vue'
import LatelyView from '../views/user-space/LatelyView.vue'
import ArticleView from '../views/user-space/ArticleView.vue'
import ColumnView from '../views/user-space/ColumnView.vue'
import DownloadView from '../views/user-space/DownloadView.vue'
import CollectView from '../views/user-space/CollectView.vue'
import SubView from '../views/user-space/SubView.vue'
import WatchView from '../views/user-space/sub/WatchView.vue'
import FansView from '../views/user-space/sub/FansView.vue'

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
    props: true,
  },
  {
    path: '/userspace/:id',
    name: 'userSpace',
    component: OtherSpace,
    props: true,
    children: [
      {
        path: 'lately',
        name: 'latelyView',
        component: LatelyView
      },
      {
        path: 'article',
        name: 'articleView',
        component: ArticleView
      },
      {
        path: 'column',
        name: 'columnView',
        component: ColumnView
      },
      {
        path: 'download',
        name: 'downloadView',
        component: DownloadView
      },
      {
        path: 'collect',
        name: 'collectView',
        component: CollectView
      },
      {
        path: 'sub',
        name: 'subView',
        component: SubView,
        props: true,
        
        children: [
          {
            path: 'watch',
            name: 'watchView',
            component: WatchView
          },
          {
            path: 'fans',
            name: 'fansView',
            component: FansView
          },
        ]
      },
    ]
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
