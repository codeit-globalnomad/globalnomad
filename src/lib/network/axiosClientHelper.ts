import axios from 'axios';

const axiosClientHelper = axios.create({ baseURL: '/api', withCredentials: true });

export default axiosClientHelper;
