import Config from './MiTACConfig';
import Service from './Service';

const MiTAC = {
    saveTokenToLocalStorage: (
        accessToken = '',
        refreshToken = '',
        tenant = ''
    ) => {

        return new Promise((resolve) => {

            const nowTimeStamp = new Date().getTime(),
                // 偷偷減 3 秒，提早把 token 刷新~
                expireTime = nowTimeStamp + Config.deviceExpireTimeRange - 3000;
    
            // token 暫時放在客戶端~
            window.localStorage.setItem('accessToken', accessToken);
            if (refreshToken) {
    
                window.localStorage.setItem('refreshToken', refreshToken);
    
            }
            window.localStorage.setItem('tenant', tenant);
            window.localStorage.setItem('expireTime', expireTime);

            resolve({

            });

        });

    },
    refreshToken () {

        const refreshToken = window.localStorage.getItem('refreshToken');

        return new Promise((resolve) => {

            Service.refreshToken({
                refreshToken
            })
                .then((res) => {
    
                    this.isGuest = false;
    
                    MiTAC.saveTokenToLocalStorage(
                        res.data.accessToken,
                        '',
                        res.data.tenant,
                    );

                    resolve({
                        res
                    });
        
                });

        })

    }
};

export default MiTAC;
