import axios from "axios";

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:5300";

const iUser = axios.create({
  baseURL: SERVER,
});

const setToken = (token) => {
  token
    ? (iUser.defaults.headers.authorization = `Bearer ${token}`)
    : (iUser.defaults.headers.authorization = "");
};

export { iUser, setToken };
