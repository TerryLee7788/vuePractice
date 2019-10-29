import Vue from 'vue';

import withBootstrap from './hocs/withBootstrap';

import MiTACPage from './views/MiTACPage.vue';

new Vue({
  render: h => h(withBootstrap(MiTACPage)),
}).$mount('#app');
