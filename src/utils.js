
import { dataAll } from "./testData";


const domain = "https://laioffer-database.herokuapp.com";
const allItemsUrl = `${domain}/filters?zipcode&city&min_price&max_price`;
const searchItemsByGenreIdUrl = `${domain}/products/genres?genre_type=`;
const searchItemsByNameUrl = `${domain}/products/search/`;
const searchMyItemsUrl = `${domain}/products`;

export const login = (Credential) => { };

export const register = (Credential) => { };

export const getAllItems = () => {
   return dataAll;

    // return fetch(allItemsUrl)
    //   .then((response) => {
    //     if (response.status !== 200) {
    //         throw Error('Fail to get all items');
    //     }
    //     return response.json();
    // })
}

export const searchItemsByGenreId = (genreIdSelected) => {

    return dataAll.filter((item) => item.genre_type.genreType === genreIdSelected);

    // return fetch(`${searchItemsByGenreIdUrl}${genreId}`).then((response) => {
    //     if (response.status !== 200) {
    //         throw Error('Fail to find the genre');
    //     }
    //     return response.json();
    // })
}

export const searchItemsByName = (name) => {

  // return dataAll.filter((item) => item.genreId === genreIdSelected);

  // return fetch(`${searchItemsByNameUrl}${genreId}`).then((response) => {
  //     if (response.status !== 200) {
  //         throw Error('Fail to find the genre');
  //     }
  //     return response.json();
  // })
}
