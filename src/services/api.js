import axios from 'axios';
import Constants from 'expo-constants';

const { API_URL } = Constants.manifest.extra;

export default axios.create({
  baseURL: API_URL,
});
