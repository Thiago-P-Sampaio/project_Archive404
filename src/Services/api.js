import axios from "axios";


const  jogosApi = axios.create({
    baseURL: 'localhost:8080/'
})


export default jogosApi;