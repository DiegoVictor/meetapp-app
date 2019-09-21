import axios from 'axios';

export default axios.create({
  baseURL: 'https://meetapp-api.herokuapp.com',
});
