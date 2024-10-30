import axios from "axios";


const API_URL = "http://localhost:8080/api/tags/";

//Get all tags
const getTagsContent = () => {
  return axios.get(API_URL + "all");
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTagsContent
};