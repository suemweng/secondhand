
import { dataAll } from "./testData";


const domain = "https://laioffer-database.herokuapp.com";
const allItemsUrl = `${domain}/filters?zipcode&city&min_price&max_price`;
const searchItemsByGenreIdUrl = `${domain}/products/genres?genre_type=`;
const searchItemsByNameUrl = `${domain}/products/search/`;
const searchMyItemsUrl = `${domain}/products`;
const getMyAcctInfoUrl = `${domain}/user/getinfo`;
const loginUrl = `${domain}/user/authenticate`;
const registerUrl = `${domain}/user/register`;
const uploadItemUrl = `${domain}/products`;





export const login = (credential) => { 
  
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to log in");
        }

        return response.json();
    });
};

export const register = (credential) => { 

  return fetch(registerUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
}).then((response) => {
  if (response.status === 409) {
    throw Error("User already exists");
}
    if (response.status !== 200) {
        throw Error("Fail to register");
    }
});
};

export const getAllItems = () => {
   //return dataAll;

    return fetch(allItemsUrl)
      .then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to get all items');
        }
        return response.json();
    })
}

export const searchItemsByGenreId = (genreIdSelected) => {

    // return dataAll.filter((item) => item.genre_type.genreType === genreIdSelected);

    return fetch(`${searchItemsByGenreIdUrl}${genreIdSelected}`).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to find the genre');
        }
        return response.json();
    })
}

export const searchItemsByName = (name) => {

  //return dataAll.filter((item) => item.product_name === name);
  const authToken = localStorage.getItem("authToken");

  return fetch(`${searchItemsByNameUrl}${name}`
  // , {
  //   headers: {
  //       //Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb3NlIiwiZXhwIjoxNjYwNzkzOTkyLCJpYXQiOjE2NjA3MDc1OTJ9.E8-wX_qP6G7X4nOEAkA0J6S6KrfR2Bdih_HfLnIlST0",
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   }
    ).then((response) => {
      // if (response.status === 403) {
      //   throw Error('Please log in');
      // }
      
      if (response.status !== 200) {
          throw Error('Fail to find the product');
      }
      return response.json();
  })
}

export const getMyAcctInfo = () => {
  //return dataAll;
   const authToken = localStorage.getItem("authToken");
   return fetch(getMyAcctInfoUrl, {
    headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
     .then((response) => {
       if (response.status !== 200) {
           throw Error('Fail to get your account info');
       }
       return response.json();
   })
}

export const getMyItems = () => {
  //return dataAll;
   const authToken = localStorage.getItem("authToken");
   return fetch(searchMyItemsUrl, {
    headers: {
        //Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb3NlIiwiZXhwIjoxNjYwNzkzOTkyLCJpYXQiOjE2NjA3MDc1OTJ9.E8-wX_qP6G7X4nOEAkA0J6S6KrfR2Bdih_HfLnIlST0",
        Authorization: `Bearer ${authToken}`,
      },
    })
     .then((response) => {
       if (response.status !== 200) {
           throw Error('Fail to get your items');
       }
       return response.json();
   })
}

export const uploadItem = (data) => {
  const authToken = localStorage.getItem("authToken");


  return fetch(uploadItemUrl, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${authToken}`,
      },
      body: data,
  }).then((response) => {
      if (response.status !== 200) {
          throw Error("Fail to upload item");
      }
  });
};

