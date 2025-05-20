import axios from "axios";


const  gamesService = axios.create({
    baseURL: 'https://404archive.azurewebsites.net/jogos'
})


export default gamesService;