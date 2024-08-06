import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Article } from '../../types/NewsTypes'

export interface NewsState {
  articles: Article[] | undefined
  inProgressArticles: any | undefined
}

const initialState: NewsState = {
  articles: undefined,
  inProgressArticles: undefined,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<any>) {
      state.articles = action.payload
    },
    setInProgressArticles(state, action: PayloadAction<any>) {
      state.inProgressArticles = action.payload
    },
  },
})
export const selectNews = (state: RootState) => state.news

export const { setArticles, setInProgressArticles } = newsSlice.actions
export default newsSlice.reducer
