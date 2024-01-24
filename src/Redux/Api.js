import axios from 'axios'
const API=axios.create({
    baseURL:"https://webhook.site"
   
})
export const saveSegments=(data)=>API.post('/89ba6945-89d9-4bef-be9b-9929e5c0c6c8',data)