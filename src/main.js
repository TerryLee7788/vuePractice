import Vue from 'vue'
import App from './App.vue'
import withBootstrap from './hocs/withBootstrap';

Vue.config.productionTip = false

new Vue({
  render: h => h(withBootstrap(App)),
}).$mount('#app')
