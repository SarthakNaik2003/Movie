import AuthRoute from './router/auth-route'
import './App.css'
import apiService from "./service/api/movieapi"
import { useEffect, useState } from 'react'

import { Provider } from 'react-redux'
import store from './reduxContainer/Store'

function App() {


  return (
    <Provider store={store}>
      <>
        <AuthRoute />
      </>
    </Provider>
  )
}

export default App
