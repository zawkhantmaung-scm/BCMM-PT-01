import axios from "axios";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return "Bearer " + user.token;
  } else {
    return "";
  }
}

const instance = axios.create({
  baseURL: "http://localhost:8000/api/"
});

instance.defaults.headers.common['Authorization'] = getToken();

export default instance;
