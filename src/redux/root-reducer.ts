import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/auth.slice'
import { api } from './apiRTKQ/api'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer
})
