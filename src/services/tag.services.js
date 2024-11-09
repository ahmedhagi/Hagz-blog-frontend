import axios from "axios";
import { urlProvider } from "../config/UrlProviderInstanceManager";

const API_URL =  urlProvider.getDomainUrl() + "tags/";

//Get all tags
const getTagsContent = () => {
  return axios.get(API_URL + "all");
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTagsContent
};