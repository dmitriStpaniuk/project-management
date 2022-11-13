import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupStore } from 'store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LanguageContextProvider } from 'components/languageContext/languageContext';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = setupStore();

root.render(
  <React.StrictMode>
    <LanguageContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </LanguageContextProvider>
  </React.StrictMode>
);
