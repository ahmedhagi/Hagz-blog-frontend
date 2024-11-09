import axios from "axios";

import { urlProvider } from "../config/UrlProviderInstanceManager";

const API_URL =  urlProvider.getDomainUrl() + "topics/";

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
