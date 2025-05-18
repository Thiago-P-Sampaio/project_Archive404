import axios from "axios";


const  gamesService = axios.create({
    baseURL: 'http://192.168.1.170:8082/games'
})


export default gamesService;