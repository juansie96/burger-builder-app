import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-2a4c1.firebaseio.com/'
    
});

export default instance;