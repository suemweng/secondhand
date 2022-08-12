import item1 from './assets/images/item1.webp';
import item2 from './assets/images/item2.jpeg';
import item3 from './assets/images/item3.jpeg';

 // temperay fake data
 const dataAll = [
    {
      itemId: 1,
      genreId: 'Shoes',
      title:'item 1',
      image: item1
    },
    {
      itemId: 2,
      genreId: 'Bags',
      title:'item 2',
      image: item2
    },
    {
      itemId: 3,
      genreId: 'Clothes',
      title:'item 3',
      image: item3
    }
  ]


const domain = "";
const allItemsUrl = `${domain}/product`;
const searchItemsByGenreIdUrl = `${domain}/product/genre_id=`;


export const login = (Credential) => { };

export const register = (Credential) => { };

export const getAllItems = () => {
    return dataAll;
    // return fetch(allItemsUrl).then((response) => {
    //     if (response.status !== 200) {
    //         throw Error('Fail to get all items');
    //     }

    //     return response.json();
    // })
}

export const searchItemsByGenreId = (genreIdSelected) => {

    return dataAll.filter((item) => item.genreId === genreIdSelected);

    // return fetch(`${searchItemsByGenreIdUrl}${genreId}`).then((response) => {
    //     if (response.status !== 200) {
    //         throw Error('Fail to find the genre');
    //     }
    //     return response.json();
    // })
}