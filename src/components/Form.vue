<template>
    <!-- login form -->
    <div class="login">
        <h1>登入頁面</h1>
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="帳號:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder="請輸入您的帳號"
                ></b-form-input>

            </b-form-group>

            <b-form-group id="input-group-2" label="密碼:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="請輸入您的密碼"
                ></b-form-input>
            </b-form-group>

            <b-button
                type="submit"
                variant="primary"
                block
            >登入</b-button>
        </b-form>
    </div>
</template>

<script>
import Service from '../lib/Service';
import MiTAC from '../lib/MiTAC';

export default {
    data () {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        memeberLogin () {

            return Service.memeberLogin({
                login: this.form.username,
                password: this.form.password
            });

        },
        onSubmit (evt) {

            evt.preventDefault();

            // 簡單的檢查 QQ~
            if (
                this.form.username !== '' &&
                this.form.password !== ''
            ) {

                this.memeberLogin()
                    .then((res) => {

                        if (res.data.accessToken) {

                            this.isGuest = false;

                            MiTAC.saveTokenToLocalStorage(
                                res.data.accessToken,
                                res.data.refreshToken,
                                res.data.tenant,
                            );

                        }

                        // 塞完先重整一下~
                        window.location.reload();

                    });

            }

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
