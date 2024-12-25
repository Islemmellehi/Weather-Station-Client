import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 


const login = async (username, password) => {
    const response = await axios.post(
      `${API_URL}/login`,
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log("Login response:", response);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  };
  

const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, password });
  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
