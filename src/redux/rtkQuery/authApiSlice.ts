import { apiSlice } from './apiSlice'
import { IAuthData, IAuthRequest } from '../../types/auth'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<IAuthData, IAuthRequest>({
			query: credentials => ({
				url: '/login',
				method: 'POST',
				body: { ...credentials }
			})
		})
	})
})

export const { useLoginMutation } = authApiSlice
