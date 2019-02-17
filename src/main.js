import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPauseCircle, 
         faPlayCircle,
         faFastBackward, 
         faFastForward, 
         faHeadphones} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

library.add(faPauseCircle, faPlayCircle, faFastBackward, faFastForward, faHeadphones);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueResource);
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.http.headers.common['Content-Type'] = 'application/json';
Vue.http.headers.common['Accept'] = 'application/json';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
