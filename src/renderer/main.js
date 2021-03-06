/* *****************************************
| main.js
|
| Entry point of the renderer process
*/



/* *****************************************
| IMPORTS
*/

// Vue.js
import Vue from 'vue'
import Router from 'vue-router'

// Element UI (UI framework)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

// Importing entry componnenet for vue.js
import App from './App'

// Importing router and application global store
import router from './router'
import store from './store'

// Require electron-vue ()
// to access electron methods in all the vue componenents
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// set the tips to false
Vue.config.productionTip = false

// Initialize Element UI with the right locale
//Vue.use(Router)
Vue.use(ElementUI, { locale })

// Initialize the vue app
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
