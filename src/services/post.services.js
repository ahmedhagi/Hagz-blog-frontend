import axios from "axios";
import authHeader from "./auth-header";

import { urlProvider } from "../config/UrlProviderInstanceManager";

const API_URL = urlProvider.getDomainUrl() + "posts/";

//GET Requests
const getPostsContent = () => {
  return axios.get(API_URL + "all");
};

const getPostswithPagination = (offset, pageSize, options = {}) => {
  const { username, topicName, tagName } = options;
  
  return axios
    .get(API_URL + "get/pagination/" + offset + "/" + pageSize, {
      params: {
        username: username,
        topicName: topicName,
        tagName: tagName,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getPost = (id) => {
  return axios.get(API_URL + "get/" + id).then((response) => {
    return response.data;
  });
};


const getRelatedPosts = (postId, limit = 5) => {
  return axios
    .get(API_URL + "get/" + postId + "/related", {
      params: { limit: limit },
    })
    .then((response) => {
      return response.data;
    });
  }

//POST Requests

const createNewPost = (data) => {
  return axios
    .post(API_URL + "new_post", data, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//UPDATE Requests
const updatePost = (id, data) => {
  return axios
    .put(API_URL + "update/" + id, data, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//DELETE Requests
const deletePost = (id) => {
  return axios
    .delete(API_URL + "delete/" + id, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPostsContent,
  getPost,
  createNewPost,
  deletePost,
  updatePost,
  getPostswithPagination,
  getRelatedPosts,
};
