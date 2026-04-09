import axios from "axios";
import { getLocalData } from './config'
import { loadRbSettings } from '@/common/js/cache'

let service = axios.create();

service.interceptors.request.use((config) => {
    return config;
});

service.interceptors.response.use((resp) => {
    return resp;
}, (error) => {
    return error;
});

const ENABLE_RB = process.env.VUE_APP_ENABLE_RB !== 'false'
const LOCAL_DATA_URL = process.env.VUE_APP_LOCAL_DATA_URL || 'https://ework-1251965636.cos.ap-beijing.myqcloud.com/web.json'

export function GetWebData() {
    if (!ENABLE_RB) {
        return getLocalData(LOCAL_DATA_URL).then((data) => {
            return { data: data }
        })
    }
    const settings = loadRbSettings()
    if (settings.dataMode === 'remote') {
        var fetchAllNavData = require('./config').fetchAllNavData
        return fetchAllNavData(settings.baseUrl, settings.environment).then((data) => {
            return { data: data }
        })
    }
    return getLocalData(LOCAL_DATA_URL).then((data) => {
        return { data: data }
    })
}
