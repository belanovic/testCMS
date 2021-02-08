import HOST_BACKEND from './hostBackend.js';

export async function getAllArticles() {
    try {
        const response = await fetch(`${HOST_BACKEND}/allArticles`);
        const allNews = await response.json();
        return allNews
    }
    catch (err) {
        console.log(err)
    }
}

export async function getArticle(id) {
    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`);        
        return response
    }
    catch(err) {
        console.log(err);
    }
}
export async function postArticle({id, title, subtitle, text, imgURL, imgName, dateUpdated, dateCreated, category, position}) {
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
                imgURL: imgURL,
                imgName: imgName,
                dateUpdated: dateUpdated,
                dateCreated: dateCreated,
                category: category,
                position: position
            })
        })
    }
    catch (err) {
        console.log(err);
    }
}

export async function updateArticle({id, title, subtitle, text, imgURL, imgName, position, category}) {
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
                imgURL: imgURL,
                imgName: imgName,
                dateUpdated: Date.now(),
                category: category,
                position: position
            })
        })
    }
    catch (err) {
        console.log(err)
    }
}

export async function deleteArticle(id) {
    try {
        const articleToDelete = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
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
    }
    catch (err) {
        console.log(err)
    }
}