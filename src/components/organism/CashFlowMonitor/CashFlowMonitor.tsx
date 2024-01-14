import { useState } from 'react'
import { CashFlowMonitorUI } from './CashFlowMonitorUI'
import './cashFlowMonitor.scss'
import { IUpdateTable } from '../../../types/personalTable'

interface Props {
	updateTable: (
		value: IUpdateTable,
		setState: React.Dispatch<React.SetStateAction<boolean>>
	) => Promise<void>

	totalExpense: number[] | number
	totalIncome: number[] | number
	handleMonthChange: (newMonth: Date) => void
}

export const CashFlowMonitor = (props: Props) => {
	const { totalExpense, totalIncome, ...otherProps } = props
	const [incomeModal, setIncomeModal] = useState<boolean>(false)
	const [expenseModal, setExpenseModal] = useState<boolean>(false)

	const calculateSum = (data: number[] | number) => {
		if (Array.isArray(data)) {
			return data.reduce((sum, num) => sum + num, 0)
		} else {
			return data
		}
	}

	const income: number = calculateSum(totalIncome)
	const expense: number = calculateSum(totalExpense)
	const totalBudget = income - expense

	return (
		<CashFlowMonitorUI
			income={income}
			expense={expense}
			totalBudget={totalBudget}
			expenseModal={expenseModal}
			setExpenseModal={setExpenseModal}
			incomeModal={incomeModal}
			setIncomeModal={setIncomeModal}
			{...otherProps}
		/>
	)
}
