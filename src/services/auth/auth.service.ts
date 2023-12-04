import { axiosLogin } from '../../api/axios'
import { IAuthData, IAuthRequest } from '../../types/auth'
import { responseHandler } from '../responseHandler'

export const AuthService = {
	async login({ email, password }: IAuthRequest) {
		const response = await responseHandler(
			axiosLogin.post<IAuthData>('/login', {
				email,
				password
			})
		)

		return response
	},

	async register({ email, password }: IAuthRequest) {
		const response = await responseHandler(
			axiosLogin.post<IAuthData>('/registration', {
				email,
				password
			})
		)

		return response
	}
}
