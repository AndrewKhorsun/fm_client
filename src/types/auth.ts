export interface IAuthData {
	user: {
		id: number
		email: string
	} | null
	accessToken: string
}

export interface ILoginRequest {
	email: string
	password: string
}

export interface IActivationRequest {
	activationKey: string
}

export interface IRegistrationRequest extends ILoginRequest {
	userName: string
}
