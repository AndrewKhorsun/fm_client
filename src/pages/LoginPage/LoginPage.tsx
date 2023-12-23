import './loginPage.scss'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/rtkQuery/authApiSlice'
import { setCredentials } from '../../redux/auth/authSlice'
import { SignUp } from '../../components/organism/SignUp/SignUp'
import { SignIn } from '../../components/organism/SignIn/SignIn'
import { ILoginRequest, IRegistrationRequest } from '../../types/auth'

const loginInitialState: ILoginRequest = {
	password: '',
	email: ''
}

const regInitialState: IRegistrationRequest = {
	password: '',
	email: '',
	userName: ''
}

export const LoginPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const fromPage: string = location.state?.from?.pathname || '/'

	const [isLogin, setIsLogin] = useState(false)
	const [login, { isLoading }] = useLoginMutation()
	const [loginData, setLoginData] = useState<ILoginRequest>(loginInitialState)
	const [registrationData, setRegistrationData] =
		useState<IRegistrationRequest>(regInitialState)


	const handelSubmit = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: string
	) => {
		event.preventDefault()
		if (action === 'login') {
			const userData = await login(loginData).unwrap()
			dispatch(setCredentials({ ...userData }))
			navigate(fromPage)
			return
		}
	}

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
				></input>
				<SignUp
					handelSubmit={handelSubmit}
					isLoading={isLoading}
					registrationData={registrationData}
					setRegistrationData={setRegistrationData}
				/>
				<SignIn
					handelSubmit={handelSubmit}
					isLoading={isLoading}
					loginData={loginData}
					setLoginData={setLoginData}
				/>
			</div>
		</div>
	)
}
