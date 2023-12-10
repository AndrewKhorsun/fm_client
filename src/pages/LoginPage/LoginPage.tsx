import './loginPage.scss'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { inputHandler } from '../../utils/hooks/scripts/inputHandler'
import { IAuthRequest } from '../../types/auth'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/rtkQuery/authApiSlice'
import { setCredentials } from '../../redux/auth/authSlice'

const initialState: IAuthRequest = {
	email: '',
	password: ''
}

export const LoginPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const [login, { isLoading }] = useLoginMutation()

	const [isLogin, setIsLogin] = useState(false)
	const [loginData, setLoginData] = useState<IAuthRequest>(initialState)
	const [registrationData, setRegistrationData] =
		useState<IAuthRequest>(initialState)

	const fromPage: string = location.state?.from?.pathname || '/'

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
				<div className='login-form__sign-up'>
					<form>
						<label htmlFor='chk' aria-hidden='true'>
							Sign up
						</label>
						<input type='text' name='txt' placeholder='User name' />
						<input
							type='email'
							name='email'
							placeholder='Email'
							value={registrationData.email}
							onChange={event =>
								inputHandler<IAuthRequest>(event, setRegistrationData, 'email')
							}
						/>
						<input
							type='password'
							name='password'
							placeholder='Password'
							value={registrationData.password}
							onChange={event =>
								inputHandler<IAuthRequest>(
									event,
									setRegistrationData,
									'password'
								)
							}
						/>
						<button
							className='login-form__button'
							disabled={isLoading}
							onClick={event => handelSubmit(event, 'registration')}
						>
							Sign up
						</button>
					</form>
				</div>
				<div className='login-form__login'>
					<form>
						<label htmlFor='chk' aria-hidden='true'>
							Login
						</label>
						<input
							type='email'
							name='email'
							placeholder='Email'
							value={loginData.email}
							onChange={event =>
								inputHandler<IAuthRequest>(event, setLoginData, 'email')
							}
						/>
						<input
							type='password'
							name='password'
							placeholder='Password'
							value={loginData.password}
							onChange={event =>
								inputHandler<IAuthRequest>(event, setLoginData, 'password')
							}
						/>
						<button
							disabled={isLoading}
							className='login-form__button'
							onClick={event => {
								event.preventDefault()

								handelSubmit(event, 'login')
							}}
						>
							{isLoading ? 'Loading...' : 'Login'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
