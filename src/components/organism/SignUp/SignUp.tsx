import { IRegistrationRequest } from '../../../types/auth'
import { inputHandler } from '../../../utils/hooks/scripts/inputHandler'
import { Button } from '../../atoms/button/button'
import './signUp.scss'

interface Props {
	registrationData: IRegistrationRequest
	setRegistrationData: React.Dispatch<
		React.SetStateAction<IRegistrationRequest>
	>
	isLoading: boolean
	handelSubmit: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: string
	) => Promise<void>
}

export const SignUp = (props: Props) => {
	const { handelSubmit, isLoading, registrationData, setRegistrationData } =
		props

	return (
		<div className='sign-up'>
			<form>
				<label htmlFor='chk' aria-hidden='true'>
					Sign up
				</label>
				<input type='text' name='txt' placeholder='User name' />
				<input
					type='email'
					name='email'
					placeholder='Email'
					autoComplete='email'
					value={registrationData.email}
					onChange={event => inputHandler(event, setRegistrationData, 'email')}
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					autoComplete='current-password'
					value={registrationData.password}
					onChange={event =>
						inputHandler(event, setRegistrationData, 'password')
					}
				/>
				<Button
					onClick={event => handelSubmit(event, 'registration')}
					disabled={isLoading}
				>
					Sign up
				</Button>
			</form>
		</div>
	)
}
