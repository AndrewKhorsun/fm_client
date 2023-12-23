import { apiSlice } from './apiSlice'
import {
	IActivationResponse,
	IAuthData,
	ILoginRequest,
	IRegistrationRequest
} from '../../types/auth'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<IAuthData, ILoginRequest>({
			query: credentials => ({
				url: '/login',
				method: 'POST',
				body: { ...credentials }
			})
		}),
		activation: builder.query<IActivationResponse, string>({
			query: key => ({
				url: `/activation/${key}`,
				method: 'GET'
			})
		}),
		registration: builder.mutation<{ message: string }, IRegistrationRequest>({
			query: credentials => ({
				url: '/registration',
				method: 'POST',
				body: { ...credentials }
			})
		})
	})
})

export const { useLoginMutation, useActivationQuery, useRegistrationMutation } =
	authApiSlice
