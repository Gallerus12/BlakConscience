import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";



const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
     
      <Auth0Provider
    domain="dev-1dftnrjnsyxgtuof.us.auth0.com"
    clientId="u8AmlNhfDvHeVpb9xj9KXr2hFHp0fjdb"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <ColorModeScript />
    <App />
    </ Auth0Provider>

  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
