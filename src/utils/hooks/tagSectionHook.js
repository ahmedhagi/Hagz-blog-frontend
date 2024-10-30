export const selectedToTopic = (choice) => {
    choice = JSON.parse(JSON.stringify(choice).split('"value":').join('"id":'));
    choice = JSON.parse(JSON.stringify(choice).split('"label":').join('"name":'));      
}

export const selectToTags = (choice) => {
    choice = choice.map(({value, label}) => ({id:value, name:label}));
     
}