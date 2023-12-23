import { useParams } from 'react-router-dom'
import './activationPage.scss'
import { useActivationQuery } from '../../redux/rtkQuery/authApiSlice'
import { useNavigateCustom } from '../../hooks/useNavigateCustom'
import { Button } from '../../components/atoms/button/Button'
import { useEffect } from 'react'

export const ActivationPage = () => {
	const { key } = useParams<{ key: string }>()
	const { data, isLoading, isError } = useActivationQuery(key ?? '')

	const goLogin = useNavigateCustom('/login', '/budget')

	useEffect(() => {
		if (isError) {
			goLogin()
		}
	}, [goLogin, isError])
console.log(data?.userName);

	return (
		<div className='container'>
			{isLoading ? (
				<h1>Activation...</h1>
			) : (
				<div className='activation'>
					<h1>
						{`Hi ${data?.userName ?? "user"}! Your account has been activated. You can log in to your profile`}
					</h1>
					<Button className='activation__button' onClick={() => goLogin()}>
						LOGIN
					</Button>
				</div>
			)}
		</div>
	)
}
