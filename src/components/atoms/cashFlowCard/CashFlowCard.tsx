import { formatLargeNumber } from '../../../utils/scripts/formatLargeNumber'
import './cashFlowCard.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {
	title: string
	amount: number
}

export const CashFlowCard = (props: Props) => {
	const { title, amount, className } = props
	return (
		<div className={`cash-flow-card ${className}`}>
			<p className='cash-flow-card__title'>{title}</p>
			<div className='cash-flow-card__amount'>{formatLargeNumber(amount)}</div>
		</div>
	)
}
