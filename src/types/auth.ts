export interface IAuthData {
	user: {
		id: number
		email: string
	} | null
	accessToken: string
}

export interface IAuthRequest {
	email: string
	password: string
}
