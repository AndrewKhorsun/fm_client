import React from 'react'
import { ILoginRequest } from '../../../types/auth'
import { inputHandler } from '../../../utils/scripts/inputHandler'
import { Button } from '../../atoms/button/Button'
import './signIn.scss'

interface Props {
	loginData: ILoginRequest
	setLoginData: React.Dispatch<React.SetStateAction<ILoginRequest>>
	isLoading: boolean
	handelSubmit: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: string
	) => Promise<void>
}

export const SignIn = (props: Props) => {
	const { isLoading, handelSubmit, loginData, setLoginData } = props

	return (
		<div className='login'>
			<form>
				<label htmlFor='chk' aria-hidden='true'>
					Login
				</label>
				<input
					type='email'
					name='email'
					placeholder='Email'
					autoComplete='email'
					value={loginData.email}
					onChange={event => inputHandler(event.target.value, setLoginData, 'email')}
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					autoComplete='current-password'
					value={loginData.password}
					onChange={event => inputHandler(event.target.value, setLoginData, 'password')}
				/>
				<Button
					disabled={isLoading}
					className='login-form__button'
					onClick={event => {
						event.preventDefault()

						handelSubmit(event, 'login')
					}}
				>
					{isLoading ? 'Loading...' : 'Login'}
				</Button>
			</form>
		</div>
	)
}
