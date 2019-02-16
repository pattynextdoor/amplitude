import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      redirect: to => {
        let my_client_id = 'fa4cbe30a849431489c696eb50f9fb3e';
        let redirect_uri = 'http://localhost:8080';
        let scopes = 'user-read-private user-read-email';
        let url = 'https://accounts.spotify.com/authorize'
                  + '?response_type=code'
                  + '&client_id='
                  + my_client_id
                  + (scopes ? '&scope=' + encodeURIComponent(scopes) : '')
                  + '&redirect_uri=' + encodeURIComponent(redirect_uri);
        return url;
      }
    }
  ]
})
