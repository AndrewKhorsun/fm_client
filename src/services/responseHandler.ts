import { AxiosResponse, AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const ERROR_SOMETHING = 'Something went wrong, try again later'

type OptionsFlags<Type> = {
	[Property in keyof Type]: string[]
}

export const responseHandler = <T>(
	request: Promise<AxiosResponse<T>>
) => {
	return request
		.then(response => response.data)
		.catch(e => {
			const err = e as AxiosError<OptionsFlags<T>>

			if (err.request?.status === 0 || err.request?.status >= 500) {
				toast.error(ERROR_SOMETHING, {
					toastId: ERROR_SOMETHING
				})
			}
			const errData: OptionsFlags<T> | undefined = err.response?.data
			const values: string[] = errData ? Object.values(errData) : []
			const message: string = values[0]
			toast.error(message, {
				toastId: message
			})

			return Promise.reject(new Error(message))
		})
}
