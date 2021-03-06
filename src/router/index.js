import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import ArtworksIndex from "../views/ArtworksIndex.vue";
import ArtworksNew from "../views/ArtworksNew.vue";
import ArtworksShow from "../views/ArtworksShow.vue";
import ArtworksEdit from "../views/ArtworksEdit.vue";
import CollegesIndex from "../views/CollegesIndex.vue";
import CollegesShow from "../views/CollegesShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UsersEdit
  },
  {
    path: "/artworks",
    name: "artworks-index",
    component: ArtworksIndex
  },
  {
    path: "/artworks/new",
    name: "artworks-new",
    component: ArtworksNew
  },
  {
    path: "/artworks/:id",
    name: "artworks-show",
    component: ArtworksShow
  },
  {
    path: "/artworks/:id/edit",
    name: "artworks-edit",
    component: ArtworksEdit
  },
  {
    path: "/colleges",
    name: "colleges-index",
    component: CollegesIndex
  },
  {
    path: "/colleges/:id",
    name: "colleges-show",
    component: CollegesShow
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
