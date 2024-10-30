import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/comment/";

//Get comments from post
const getComments = (id) => {
    return axios
        .get(API_URL + "get/" + id)
        .then((response) => {
            return response.data;
        })
}

//Add comment to post
const createNewComment = (id,comment) => {
    return axios
     .post(API_URL + id + "/comment/", {
       content: comment
     }, { headers: authHeader() })
     .then((response) => {
        return response.data;
     });
 };

 //Update existing comment
 const updateComment = (id,comment) => {
    return axios
     .put(API_URL + id + "/update/", {
       content: comment
     }, { headers: authHeader() })
     .then((response) => {
        return response.data;
     });
 };

 //Delete comment from post
 const deleteComment = (id) => {
    return axios
     .delete(API_URL + id + "/delete/",
      { headers: authHeader() })
     .then((response) => {
        return response.data;
     }
     ,(error) => {
        console.log(authHeader());
     }
    
    );
 };

  

 // eslint-disable-next-line import/no-anonymous-default-export
 export default{
    getComments,
    createNewComment,
    updateComment,
    deleteComment
 }