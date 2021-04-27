import HOST_BACKEND from './hostBackend.js';

export async function getAllArticles() {
    try {
        const response = await fetch(`${HOST_BACKEND}/allArticles`);
        const allNews = await response.json();
        return allNews
    }
    catch (err) {
        console.log(err); 
    }
}

export async function getArticle(id) {
    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`);
        const selectedArticle = await response.json();
        return selectedArticle
    }
    catch(err) {
        console.log(err);
    }
}
export async function postArticle({id, title, subtitle, text, paragraphs, imgURL, imgName, tagsArr,
                                dateUpdated, dateCreated, datePublished, videoURL, videoName,
                                category, position, published, videoDescription, imgDescription, author, source}) {
    try {
        const newArticle = await fetch(`${HOST_BACKEND}/oneArticle/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                title: title,
                subtitle: subtitle,
                text: text,
                paragraphs: paragraphs,
                imgURL: imgURL,
                imgName: imgName,
                videoURL: videoURL,
                videoName: videoName,
                dateUpdated: dateUpdated,
                dateCreated: dateCreated,
                datePublished: datePublished,
                category: category,
                position: position,
                published: published,
                imgDescription: imgDescription,
                videogDescription: videoDescription,
                source: source,
                author: author,
                tagsArr: tagsArr

            })
        })
        return newArticle
    }
    catch (err) {
        console.log(err);
    }
}

export async function updateArticle({id, title, subtitle, text,  paragraphs,
                                    imgURL, imgName, videoURL, videoName, position, 
                                    category, published, datePublished, tagsArr,
                                    imgDescription, videoDescription, author, source}) {
    try {
        const updatedArticle = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                title: title,
                subtitle: subtitle,
                text: text,
                paragraphs: paragraphs,
                imgURL: imgURL,
                imgName: imgName,
                videoURL: videoURL,
                videoName: videoName,
                dateUpdated: Date(),
                datePublished: datePublished,
                category: category,
                position: position,
                published: published,
                imgDescription: imgDescription,
                videoDescription: videoDescription,
                source: source,
                author: author,
                tagsArr: tagsArr
            })
        })
        return updatedArticle;
    }
    catch (err) {
        console.log(err)
    }
}

export async function deleteArticle(id) {
    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        const deletedArticle = response.json();
        return deletedArticle
    }
    catch (err) {
        console.log(err);
    }
}

export async function getFrontpageNews() {
    try {
        const response = await fetch(`${HOST_BACKEND}/frontpageArticles`);
        const newsFrontpage = await response.json();
        return newsFrontpage
    }
    catch (err) {
        console.log(err)
    }
}

export async function updateArticlePosition(id, position) {
    try {
        console.log(id, position)
        const updatedArticle = await fetch(`${HOST_BACKEND}/articlePosition/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                position: position
            })
        })
        return updatedArticle
    }
    catch (err) {
        console.log(err)
    }
}

export async function getByCategory(category) {
    try {
        const response = await fetch(`${HOST_BACKEND}/category/${category}`);
        const newsByCategory = await response.json();
        return newsByCategory
    }
    catch (err) {
        console.log(err)
    }
}

export async function publishArticle(id) {
    try {
        const response = await fetch(`${HOST_BACKEND}/publishArticle/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                published: true,
                datePublished: Date(), 
                dateUpdated: Date()
            })
        })
        const publishedArticle = response.json();
        return publishedArticle
    }
    catch (err) {
        console.log(err)
    }
}