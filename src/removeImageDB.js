import firebase from './firebase.js';

const storage = firebase.storage();

export default async function removeImageDB(imgName) {
    const imgRef = await storage.ref('site-news-images/' + imgName);
    const deletedImage = await imgRef.delete();
    return deletedImage
}