import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://gp-challenges-bas14.com.francetelecom.fr/reactcrudAPI/'
    //baseURL: 'http://localhost:8080/reactcrud/'
})

export default instance