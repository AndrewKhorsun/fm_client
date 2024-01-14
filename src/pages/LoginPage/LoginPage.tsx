import './loginPage.scss'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	useLoginMutation,
	useRegistrationMutation
} from '../../redux/rtkQuery/authApiSlice'
import { setCredentials } from '../../redux/auth/authSlice'
import { SignUp } from '../../components/organism/SignUp/SignUp'
import { SignIn } from '../../components/organism/SignIn/SignIn'
import { ILoginRequest, IRegistrationRequest } from '../../types/auth'
import { toast } from 'react-toastify'

const regInitialState: IRegistrationRequest = {
	password: '',
	email: '',
	userName: ''
}

export const LoginPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const fromPage = location.state?.from?.pathname || '/budget/personal'
	const activatedEmail: string | null = location.state?.data || null

	const [isLogin, setIsLogin] = useState(false)
	const [login, { isLoading: isLoginLoading }] = useLoginMutation()
	const [registration, { isLoading: isRegLoading }] = useRegistrationMutation()
	const [loginData, setLoginData] = useState<ILoginRequest>({
		password: '',
		email: activatedEmail ?? ''
	})
	const [registrationData, setRegistrationData] =
		useState<IRegistrationRequest>(regInitialState)

	const handelSubmit = useCallback(
		async (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
			action: string
		) => {
			event.preventDefault()
			if (action === 'login') {
				const userData = await login(loginData).unwrap()
				dispatch(setCredentials({ ...userData }))
				navigate(fromPage)
				return
			} else if (action === 'registration') {
				const regData = await registration(registrationData).unwrap()
				setRegistrationData(regInitialState)
				toast.success(regData.message)
			}
		},
		[
			dispatch,
			fromPage,
			login,
			loginData,
			navigate,
			registration,
			registrationData
		]
	)

	useEffect(() => {
		setIsLogin(!!location.state?.from?.pathname)
	}, [location.state?.from?.pathname])

	return (
		<div className='login-form__container'>
			<div className='login-form'>
				<input
					type='checkbox'
					id='chk'
					aria-hidden='true'
					checked={isLogin}
					onChange={e => setIsLogin(e.target.checked)}
				/>
				<SignUp
					handelSubmit={handelSubmit}
					isLoading={isRegLoading}
					registrationData={registrationData}
					setRegistrationData={setRegistrationData}
				/>
				<SignIn
					handelSubmit={handelSubmit}
					isLoading={isLoginLoading}
					loginData={loginData}
					setLoginData={setLoginData}
				/>
			</div>
		</div>
	)
}
