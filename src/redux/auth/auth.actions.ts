import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthData, IAuthRequest } from '../../types/auth'
import { AuthService } from '../../services/auth/auth.service'

export const register = createAsyncThunk<IAuthData, IAuthRequest>(
	'auth/register',
	async ({ email, password }) => {
		const response = await AuthService.register({ email, password })
		return response
	}
)
export const login = createAsyncThunk<IAuthData, IAuthRequest>(
	'auth/login',
	async ({ email, password }) => {
		const response = await AuthService.login({ email, password })
		return response
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	return {}
})
