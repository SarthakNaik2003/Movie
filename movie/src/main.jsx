import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { AppProvider } from "./components/context.jsx"
import '@fortawesome/fontawesome-free/css/all.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(

  <AppProvider>
    <App />
  </AppProvider>
  // </React.>
)
