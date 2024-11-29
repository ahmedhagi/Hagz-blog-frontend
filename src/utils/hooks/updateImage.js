import fileToDataString from "./fileToDataString";


function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++){
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

//Handles imageURL file data to be insert into database
export async function  updateImage(data) {
    let imgUrl = ""
    if(data["imageUrl"] !== ""){
       imgUrl = await fileToDataString( data["imageUrl"] );
       const base64 = imgUrl.split('base64,')[1];
       data["imageUrl"] = Array.from(base64ToUint8Array(base64));
    }
    return data;
  }

