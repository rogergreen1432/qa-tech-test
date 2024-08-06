import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserState {
  currentPage: string
  user: any | null
  loginPage: string
  hasOrgSso: boolean | undefined
}

const initialState: UserState = {
  user: undefined,
  currentPage: 'PUBLISHED',
  loginPage: 'LOGIN',
  hasOrgSso: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload
    },
    setCurrentPage(state, action: PayloadAction<any>) {
      state.currentPage = action.payload
    },
    setLoginPage(state, action: PayloadAction<any>) {
      state.loginPage = action.payload
    },
    setHasOrgSso(state, action: PayloadAction<any>) {
      state.hasOrgSso = action.payload
    },
  },
})
export const selectUser = (state: RootState) => state.user

export const { setUser, setCurrentPage, setLoginPage, setHasOrgSso } = userSlice.actions
export default userSlice.reducer
