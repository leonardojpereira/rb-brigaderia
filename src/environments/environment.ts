


//Dev
// const link = '';
//LocalHost
const link = 'https://localhost:5001/api/v1/';


//NGronk
// const link = 'http://localhost:5106/';

// export const environment = {
//   url: link,

//   apiUrl: link + `api/`,

//   production: false,
// };

const portal = "portal-rb-brigaderia"

export const environment = {
  version: "1.0.0",
  production: true,
  apiUrl: link,
  AUTHENTICATION: {
    authority: '',
    client_id: portal.toLocaleUpperCase(),
  }
};
