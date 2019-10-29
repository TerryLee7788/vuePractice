import axios from 'axios';

const Service = {
    memeberLogin: (req) => (axios.post('https://earth.comismart.com/auth/rest/token', req)),
    refreshToken: (req = { refreshToken: '' }) => (axios.post('https://earth.comismart.com/auth/rest/token/refresh', req)),
    deviceInfo: (req) => {

        const config = {
            headers: {
                'Authorization': `Bearer ${req.accessToken}`,
                'Accept': 'application/json'
            },
            params: {
                tenant: req.tenant
            }
        };
        return axios.get('https://earth.comismart.com/api/rest/device/1540281688669', config);

    },
};

export default Service;
