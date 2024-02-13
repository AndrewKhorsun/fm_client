import { NavLink } from 'react-router-dom'
import './navbar.scss'
import { Button } from '../../atoms/button/Button'
import { logOut } from '../../../redux/auth/authSlice'
import { useNavigateCustom } from '../../../hooks/useNavigateCustom'
import { useDispatch } from 'react-redux'
import { MdFamilyRestroom } from 'react-icons/md'
import { FaPerson } from 'react-icons/fa6'
import { RiLogoutBoxLine } from 'react-icons/ri'

export const Navbar = () => {
	const dispatch = useDispatch()

	const goLogin = useNavigateCustom('/login', '/budget')

	const logOutUser = () => {
		dispatch(logOut())
		goLogin()
	}
	return (
		<nav className='navbar'>
			<div className='navbar__links'>
				<NavLink className='navbar__link' to='personal'>
					<FaPerson size='25px' />
					<p className='navbar__link--title'>Personal Table</p>
				</NavLink>
				<NavLink className='navbar__link' to='family'>
					<MdFamilyRestroom size='25px' />
					<p className='navbar__link--title'> Family Table</p>
				</NavLink>
			</div>
			<Button className='navbar__button-logout' onClick={() => logOutUser()}>
				<RiLogoutBoxLine size='25px' />
				<p className='navbar__link--title'> Log Out</p>
			</Button>
		</nav>
	)
}
