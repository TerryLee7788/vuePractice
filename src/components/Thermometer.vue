<template>
    <!-- 溫度計資訊頁面 -->
    <div>
        <section>
            <h1>溫度計資訊頁面</h1>
            <!-- 拿到資料嚕 ~ -->
            <div
                v-if="currentData"
            >
                <h5>
                    <b-badge
                        v-for="(tag, idx) in tags"
                        :key="idx"
                    >{{tag}}</b-badge>
                </h5>
                <div>名稱: {{name}} ({{id}})</div>
                <div>描述: {{description}}</div>
                <!-- <code>{{currentData}}</code> -->
                <div class="chart">
                    <vue-c3
                        :handler="handler"
                    ></vue-c3>
                </div>
            </div>
            <!-- 等一下 websocket ... -->
            <div
                v-if="!currentData"
            >正在連線中 ... 請稍後 :)
            </div>
        </section>
    </div>
</template>

<script>
import Vue from 'vue';
import VueC3 from 'vue-c3';
import MiTAC from '../lib/MiTAC';
import Config from '../lib/MiTACConfig';
import Service from '../lib/Service';

export default {
    data () {

        return {
            id: '',
            name: '',
            description: '',
            tags: [],
            CO2Array: [],
            TemperatureArray: [],
            HumidityArray: [],
            currentData: null,
            websock: null,
            handler: new Vue()
        };

    },
    components: {
        VueC3
    },
    created () {

        this.initDeviceInfo();

    },
    methods: {
        initDeviceInfo () {

            const accessToken = window.localStorage.getItem('accessToken'),
                tenant = window.localStorage.getItem('tenant'),
                expireTime = window.localStorage.getItem('expireTime'),
                param = {
                    accessToken,
                    tenant
                };

            Service.deviceInfo(param)
                .then((res) => {

                    this.id = res.data.id;
                    this.name = res.data.name;
                    this.description = res.data.data.description;
                    this.tags = res.data.data.tags;

                    if (new Date().getTime() > +expireTime) {

                        this.handleTokenExpired();

                    }
                    else {

                        this.initWebSocket();

                    }

                })
                .catch(() => {

                    this.handleTokenExpired();

                });

        },
        handleTokenExpired () {

            MiTAC.refreshToken()
                .then(() => {

                    this.initDeviceInfo();

                });

        },
        // 初始化 weosocket
        initWebSocket () {

            this.websock = new WebSocket(Config.websocketUrl);
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;

        },
        websocketonopen () {

            this.websocketsend();

        },
        // spec: 連線後，依序發下面兩個命令給 server
        websocketsend () {

            const accessToken = window.localStorage.getItem('accessToken'),
                firstActions = {
                    action: 'authenticate',
                    token: accessToken
                },
                secondActions = {
                    action: "notification/subscribe",
                    deviceId: this.id,
                    names: ['measurements']
                };

            this.websock.send(JSON.stringify(firstActions));
            this.websock.send(JSON.stringify(secondActions));

        },
        websocketonmessage (e) {

            const data = JSON.parse(e.data);

            this.currentData = data.notification;

            if (this.currentData) {

                if (data.code === 401) {

                    this.handleTokenExpired();

                }
                else {

                    if (this.currentData.parameters) {

                        // 圖表的一些參數~
                        const CO2 = this.currentData.parameters.CO2,
                            Temperature = this.currentData.parameters.Temperature,
                            Humidity = this.currentData.parameters.Humidity,

                            CO2Label = `CO2 (${CO2.unit})`,
                            TemperatureLabel = `溫度 (${Temperature.unit})`,
                            HumidityLabel = `濕度 (${Humidity.unit})`;

                        this.CO2Array.push(CO2.value);
                        this.TemperatureArray.push(Temperature.value);
                        this.HumidityArray.push(Humidity.value);

                        let options = {
                            data: {
                                columns: [
                                    [CO2Label, ...this.CO2Array],
                                    [TemperatureLabel, ...this.TemperatureArray],
                                    [HumidityLabel, ...this.HumidityArray]
                                ],
                                // 不確定要不要用 bar ?
                                // types: {
                                //     [CO2Label]: 'bar',
                                //     [TemperatureLabel]: 'bar',
                                //     [HumidityLabel]: 'bar'
                                // }
                            }
                        };

                        this.handler.$emit('init', options);

                    }

                }

            }

        },
        websocketonerror () {

            alert('websocketonerror');

        },
        websocketclose () {

            alert('websocketclose');

        }
    },

}

</script>

<style>
.badge {
    margin-right: 8px;
}
.chart {
    margin-top: 8px;
}
g.c3-chart-lines * {
    fill: none;
}
</style>
