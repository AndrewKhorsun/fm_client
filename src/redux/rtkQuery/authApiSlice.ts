import { apiSlice } from './apiSlice'
import { IActivationRequest, IAuthData, ILoginRequest, IRegistrationRequest } from '../../types/auth'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<IAuthData, ILoginRequest>({
			query: credentials => ({
				url: '/login',
				method: 'POST',
				body: { ...credentials }
			})
		}),
		activation: builder.mutation<IAuthData, IActivationRequest>({
			query: credentials => ({
				url: '/activate',
				method: 'POST',
				body: { ...credentials }
			})
		}),
		registration: builder.mutation<IAuthData, IRegistrationRequest>({
			query: credentials => ({
				url: '/registration',
				method: 'POST',
				body: { ...credentials }
			})
		}),
	})
})

export const { useLoginMutation } = authApiSlice
