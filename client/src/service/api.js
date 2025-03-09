import axios from 'axios';
import { API_NOTIFICATION_MSG, SERVICE_URL } from '../constants/config';

import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:8000';


const controller =new AbortController();

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
   // headers: {
     //   "Accept": "application/json, form-data", 
       // "Content-Type": "application/json"
    //}
})

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return error;
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        //stop GL here
        return processResponse(response);
    },
    function (error) {
        //stop GL here
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}


//3 cases
const processError = (error) => {
    if (error.response) {
        if (error.response?.status === 403) {
            sessionStorage.clear();
            controller.abort();
        }
        else {
        //falls out of 2xx
            console.log('Error in resonse ', error.toJSON());
            controller.abort(); 
            return {
                isError: true,
                msg: API_NOTIFICATION_MSG.responseFailure,
                code: error.response.code
            }
        }

    } else if (error.request) {
        // no response -> connectivity btw front. and backend issue , network issue
        console.log('Error in request ', error.toJSON());
        controller.abort();
        return {
            isError: true,
            msg: API_NOTIFICATION_MSG.requestFailure,
            code: ""
        }
    } else {
        // frontened issue
        console.log('Error in network ', error.toJSON());
        controller.abort();
        return {
            isError: true,
            msg: API_NOTIFICATION_MSG.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE'? {} : body,
            responseType: value.responseType,
            headers : {
                Authorization : getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        });
}

export { API };