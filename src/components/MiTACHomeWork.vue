<template>
    <div class="homeWork">
        <!-- 登入 form -->
        <div
            v-if="isGuest"
        >
            <From />
        </div>
        <!-- 溫度計資訊  -->
        <div
            v-if="!isGuest"
        >
            <Thermometer />
        </div>
    </div>
</template>

<script>
import From from './Form.vue';
import Thermometer from './Thermometer.vue';

export default {
    props: ['isGuest'],
    components: {
        From,
        Thermometer
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homeWork {
    max-width: 600px;
    margin: 0 auto;
}
</style>
