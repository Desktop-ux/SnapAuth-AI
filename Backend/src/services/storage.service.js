const imagekit = require("imagekit");

const ik = new imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file , filename){
    const response = await ik.upload({
        file : file,
        fileName : filename,
        folder : "/posts"
    });
    return response;
}
module.exports = uploadFile;