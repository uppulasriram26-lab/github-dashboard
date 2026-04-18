import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getUser = async (username) => {
  const res = await axios.get(`${BASE_URL}/users/${username}`);
  return res.data;
};

export const getRepos = async (username) => {
  const res = await axios.get(`${BASE_URL}/users/${username}/repos`);
  return res.data;
};