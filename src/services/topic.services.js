import axios from "axios";

const API_URL = "http://localhost:8080/api/topics/";

//Get Topics
const getTopics = () => {
  return axios.get(API_URL + "all").then((response) => {
    return response;
  });
};

//Get Tags from Topics
const getTagsFromTopic = (topicName) => {
  return axios.get(API_URL + "all/tags/" + topicName).then((response) => {
    return response;
  });
};

const topicService = { getTopics, getTagsFromTopic };

export default topicService;
