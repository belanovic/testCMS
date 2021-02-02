import React from 'react';
import firebase from './firebase.js';
import getAllArticles from './getDatabase.js';
import context from './newsContext';

const database = firebase.database();
const storage = firebase.storage();

async function removeImagesDB() {
    const allImages
    const currentImgRef = await storage.ref('site-news-images/' + currentImgName);
    const deletedImage = await currentImgRef.delete();
}