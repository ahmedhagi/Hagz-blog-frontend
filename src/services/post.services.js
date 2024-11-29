import axios from "axios";
import authHeader from "./auth-header";

import { urlProvider } from "../config/UrlProviderInstanceManager";

const API_URL =  urlProvider.getDomainUrl() + "posts/";

//GET Requests
const getPostsContent = () => {
  return axios.get(API_URL + "all");
};

const getPostswithPagination = (offset,pageSize) => {
  return axios
  .get(API_URL + "get/pagination/" + offset + "/" + pageSize + "/")
  .then((response) => {
    return response.data;
  });

};

const getPost = (id) => {
  return axios
    .get(API_URL + "get/" + id)
    .then((response) => {
      return response.data;
    });
};

const getPostsByUsername = (username,offset,pageSize) => {
  return axios
    .get(API_URL + "get/username/" + offset + "/" + pageSize + "/" + username)
    .then((response) => {
      return response.data;
    });
};

const getPostsByTopic = (topic,offset,pageSize) => {
  return axios
    .get(API_URL + "get/topic/" + offset + "/" + pageSize + "/"  + topic)
    .then((response) => {
      return response.data;
    });
};

const getPostsByTag = (tag ,offset,pageSize) => {
  return axios
    .get(API_URL + "get/tag/" + offset + "/" + pageSize + "/" + tag)
    .then((response) => {
      return response.data;
    })
    ;
};

//POST Requests

const createNewPost = (data) => {
  return axios
    .post(API_URL + "new_post",
    data
    , { headers: authHeader() })
    .then((response) => {
       return response.data
    });
};


//UPDATE Requests
const updatePost = (id,data) => {
  return axios
  .put(API_URL + "update/" +  id, 
  data,
  { headers: authHeader() })
  .then((response) => {
    return response.data;
  });
};

//DELETE Requests
const deletePost = (id) => {
  return axios
  .delete(API_URL + "delete/" +  id, { headers: authHeader() })
  .then((response) => {
    return response.data;
  });
};








// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPostsContent,
  getPost,
  getPostsByTopic,
  createNewPost,
  deletePost,
  updatePost,
  getPostsByUsername,
  getPostsByTag,
  getPostswithPagination
};