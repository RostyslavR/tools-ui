import axios from "axios";

const { REACT_APP_SERVER } = process.env;

const iUser = axios.create({
  baseURL: REACT_APP_SERVER,
});

const setToken = (token) => {
  token
    ? (iUser.defaults.headers.authorization = `Bearer ${token}`)
    : (iUser.defaults.headers.authorization = "");
};

export { iUser, setToken };
