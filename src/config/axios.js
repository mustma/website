import axios from 'axios';
import { GLOBAL_API_DOMAIN } from './config';

axios.defaults.baseURL = GLOBAL_API_DOMAIN;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials':true
};

// if (Util.getLocalStorageInfo('KXTX_ACCESS_TOKEN')) {
//     axios.defaults.headers.common['Authorization'] = Util.getLocalStorageInfo('KXTX_ACCESS_TOKEN').accessToken
// }

export default axios;