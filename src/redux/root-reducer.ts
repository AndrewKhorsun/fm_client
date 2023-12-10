import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import { apiSlice } from './rtkQuery/apiSlice'

export const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer
})
