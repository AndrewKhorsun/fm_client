import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { rootActions } from '../redux/root-actions'

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(rootActions, dispatch)
}
