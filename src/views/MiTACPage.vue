<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand
                href="https://www.mitac.com.tw/"
                target="_blank"
            >MiTAC</b-navbar-brand>
        </b-navbar>
        <b-container
            class="wrap"
            fluid
        >
            <MiTACHomeWork
                :isGuest="isGuest"
            />
        </b-container>
    </div>
</template>

<script>
import MiTACHomeWork from '../components/MiTACHomeWork.vue';

export default {
    data () {
        return {
            isGuest: true
        }
    },
    components: {
        MiTACHomeWork
    },
    created () {

        this.isGuest = !window.localStorage.getItem('accessToken');

    }
}
</script>

<style>
#app {
  font-family: 'Microsoft JhengHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.wrap {
    padding-top: 16px;
}
</style>
