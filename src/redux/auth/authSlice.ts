import { createSlice } from '@reduxjs/toolkit'
import { IAuthData } from '../../types/auth'
import { TypeRootState } from '../store'

const initialState: IAuthData = {
	user: null,
	accessToken: ''
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { user, accessToken } = action.payload
			state.user = user
			state.accessToken = accessToken
		},
		logOut: state => {
			state.user = null
			state.accessToken = ''
			sessionStorage.clear()
		}
	}
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: TypeRootState) => state.auth.user
export const selectCurrentToken = (state: TypeRootState) =>
	state.auth.accessToken
