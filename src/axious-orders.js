import axios from 'axios';

const instance = axios.create({
  baseURL:'https://react-burger-ik-default-rtdb.firebaseio.com/' 
});

export default instance;