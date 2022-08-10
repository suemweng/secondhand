const domain = "";
const allItemsUrl = `${domain}/product`;
const searchItemsByGenreIdUrl = `${domain}/product/genre_id=`;


export const login = (Credential) => { };

export const register = (Credential) => { };

export const getAllItems = () => {
    return fetch(allItemsUrl).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to get all items');
        }

        return response.json();
    })
}

export const searchItemsByGenreId = (genreId) => {
    return fetch(`${searchItemsByGenreIdUrl}${genreId}`).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to find the genre');
        }
        return response.json();
    })
}