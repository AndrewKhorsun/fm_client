import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

export const axiosLogin = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})
