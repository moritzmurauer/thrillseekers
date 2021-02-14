import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Contributors from '../views/Contributors.vue'
import Posts from '../views/Posts.vue'
import Topspots from '../views/Topspots.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreateSpot from '../views/Playlists/CreateSpot.vue'
import SpotDetails from '../views/Playlists/SpotDetails.vue'
import UserProfile from '../views/Playlists/UserProfile.vue'
import AddProfileInfo from '../views/Profile/AddProfileInfo.vue'
import Category from '../views/Category/Category.vue'




//route guard
import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(!user) {
    next({name: 'Login'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
    path: '/topspots',
    name: 'Topspots',
    component: Topspots
  },
  {
    path: '/contributors',
    name: 'Contributors',
    component: Contributors
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
    {
    path: '/category/:id',
    name: 'Category',
    component: Category
  },
    {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlist/create',
    name: 'CreateSpot',
    component: CreateSpot,
    beforeEnter: requireAuth
  },
  {
    path: '/playlists/:id',
    name: 'SpotDetails',
    component: SpotDetails,
    props: true
  },

   {
    path: '/profile/:id',
    name: 'UserProfile',
    component: UserProfile, 
    },

  {
    path: '/profile/addInfo',
    name: 'AddProfileInfo',
    component: AddProfileInfo,
    beforeEnter: requireAuth
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
