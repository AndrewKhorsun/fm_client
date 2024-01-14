import { IUpdateTable } from '../../../types/personalTable'
import {
	expenseCategoryOptions,
	incomeCategoryOptions
} from '../../../utils/constants/tableConstants'
import { formatLargeNumber } from '../../../utils/scripts/formatLargeNumber'
import { Button } from '../../atoms/button/Button'
import { TableModal } from '../../molecules/TableModal/TableModal'
import Calendar from 'react-calendar'

interface Props {
	expenseModal: boolean
	setExpenseModal: React.Dispatch<React.SetStateAction<boolean>>
	setIncomeModal: React.Dispatch<React.SetStateAction<boolean>>
	incomeModal: boolean
	updateTable: (
		value: IUpdateTable,
		setState: React.Dispatch<React.SetStateAction<boolean>>
	) => Promise<void>
	income: number
	expense: number
	totalBudget: number
	handleMonthChange: (newMonth: Date) => void
}

export const CashFlowMonitorUI = (props: Props) => {
	const {
		expenseModal,
		incomeModal,
		setExpenseModal,
		setIncomeModal,
		updateTable,
		income,
		expense,
		totalBudget,
		handleMonthChange
	} = props
	return (
		<div>
			<div>
				<Calendar
					next2Label={null}
					prev2Label={null}
					view='year'
					onClickMonth={e => {
						console.log('onClickMonth', e)

						handleMonthChange(e)
					}}
				/>
			</div>
			<h1>Month</h1>
			<h1>INCOME:{formatLargeNumber(income)}</h1>
			<h1>EXPENSE:{expense}</h1>
			<h1>Total Budget:{totalBudget}</h1>
			<Button onClick={() => setIncomeModal(true)}>Income</Button>{' '}
			<Button onClick={() => setExpenseModal(true)}>Expense</Button>
			<TableModal
				onCloseModal={setIncomeModal}
				isOpenModal={incomeModal}
				categoryOptions={incomeCategoryOptions}
				updateTable={updateTable}
				buttonText='add'
				categoryType='income'
			/>
			<TableModal
				onCloseModal={setExpenseModal}
				isOpenModal={expenseModal}
				categoryOptions={expenseCategoryOptions}
				updateTable={updateTable}
				buttonText='add'
				categoryType='expense'
			/>
		</div>
	)
}
