


//Dev
// const link = 'https://portal-dev-api.gdllogistica.com.br/';
//LocalHost
const link = 'https://localhost:5001/api/';


//NGronk
// const link = 'http://localhost:5106/';

// export const environment = {
//   url: link,

//   apiUrl: link + `api/`,

//   production: false,
// };

const portal = "portal-convidados"

export const environment = {
  version: "1.0.0",
  production: true,
  apiUrl: link,
  AUTHENTICATION: {
    authority: '',
    client_id: portal.toLocaleUpperCase(),
  }
};
