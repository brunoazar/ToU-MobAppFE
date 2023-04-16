import axios  from "axios"; 

export default axios.create({
    baseURL: 'http://192.168.16.101:5000'
})