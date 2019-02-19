import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import VueResource from 'vue-resource'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPauseCircle, 
         faPlayCircle,
         faFastBackward, 
         faFastForward, 
         faHeadphones} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

// FontAwesome icons
library.add(faPauseCircle, faPlayCircle, faFastBackward, faFastForward, faHeadphones);
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue Resource HTTP
Vue.use(VueResource);
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.http.headers.common['Content-Type'] = 'application/json';
Vue.http.headers.common['Accept'] = 'application/json';

// Firebase
const config = {
    apiKey: "AIzaSyBoe8qnuBUWCXdqDM0phVzBhh4B1opEGNE",
    authDomain: "amplitude-93e16.firebaseapp.com",
    databaseURL: "https://amplitude-93e16.firebaseio.com",
    projectId: "amplitude-93e16",
    storageBucket: "amplitude-93e16.appspot.com",
    messagingSenderId: "417130094107"
};

firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
