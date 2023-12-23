import { useNavigate } from 'react-router-dom'

export const useNavigateCustom = (to: string, from?: string, data?: string) => {
	const navigate = useNavigate()

	return () =>
		navigate(to, {
			replace: true,
			state: {
				from: {
					pathname: from
				},
				data: data
			}
		})
}
