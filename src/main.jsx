import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite'

import {BrowserRouter} from 'react-router-dom';
import UserProvider from './context/UserProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
  </UserProvider>

)
