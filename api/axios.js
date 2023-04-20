import axios  from "axios"; 

export default axios.create({
    baseURL: 'http://192.168.128.109:5000'
})