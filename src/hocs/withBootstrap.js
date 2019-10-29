import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

const withBootstrap = (component) => (
    Vue.component('withBootstrap', {
        render (createElement) {
            return createElement(component)
        }
    })
);

export default withBootstrap;