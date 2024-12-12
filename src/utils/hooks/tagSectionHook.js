export const topicToTopicName= (topic) => {
    if(topic != null && topic.name != null){
        topic = topic.name;
        return topic;
    }

         
}

export const tagsToTagNames = (tags) => {
    if(tags != null){
        tags = tags.map((tag) => (tag.name));
        return tags;
    }
    
     
}

export const handleNewPostData = (data) => {

    data["topicName"] = topicToTopicName(data.topic);
    data["tagSet"] = tagsToTagNames(data.tags);
    delete data["topic"];
    delete data["tags"];

}