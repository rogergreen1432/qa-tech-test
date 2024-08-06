import { configureStore } from '@reduxjs/toolkit'
import userReducer from './users'
import thunk from 'redux-thunk'
import newsReducer from './news'

const createStore = (initialState?: any) => {
  return configureStore({
    reducer: {
      user: userReducer,
      news: newsReducer,
    },
    middleware: [thunk],
    preloadedState: initialState,
  })
}

export default createStore
