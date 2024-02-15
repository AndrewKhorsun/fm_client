import { IUpdateTable } from '../../../types/personalTable'
import {
	expenseCategoryOptions,
	incomeCategoryOptions
} from '../../../utils/constants/tableConstants'
import { Button } from '../../atoms/button/Button'
import { PeriodCalendar } from '../../atoms/calendar/PeriodCalendar'
import { TableModal } from '../../molecules/TableModal/TableModal'
import { CashFlowCard } from '../../atoms/cashFlowCard/CashFlowCard'
import './cashFlowMonitor.scss'

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
		<div className='cash-flow-monitor'>
			<PeriodCalendar handleMonthChange={handleMonthChange} />
			<div className='cash-flow-monitor__cash'>
				<div className='cash-flow-monitor__movement__money'>
					<CashFlowCard title='Income:' amount={income} />
					<CashFlowCard title='Expense:' amount={expense} />
					<CashFlowCard title='Total Budget:' amount={totalBudget} />
				</div>
			</div>
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
