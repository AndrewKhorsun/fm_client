import { useCallback, useMemo, useState } from 'react'
import {
	useGetTableQuery,
	useUpdateTableMutation
} from '../../redux/rtkQuery/personalTableSlice'
import './personalTable.scss'
import { IUpdateTable } from '../../types/personalTable'
import {
	CombinedTransaction,
	combineByCategory
} from '../../utils/scripts/combineCategories'
import { DoughnutChart } from '../../components/atoms/charts/Doughnut/DoughnutChart'
import { CashFlowMonitor } from '../../components/organism/CashFlowMonitor/CashFlowMonitor'
import { CashFlowGraph } from '../../components/organism/CashFlowGraph/CashFlowGraph'
import { CashFlowList } from '../../components/organism/CashFlowList/CashFlowList'
import { formatDate } from '../../utils/scripts/formatDate'

export const PersonalTablePage = () => {
	const [updatePersonalTable] = useUpdateTableMutation()
	const [selectedMonth, setSelectedMonth] = useState<string>(
		formatDate(new Date())
	)
	const { data, refetch, isLoading } = useGetTableQuery(`${selectedMonth}`, {
		refetchOnMountOrArgChange: true
	})

	const preparedData: CombinedTransaction[] | undefined = useMemo(
		() => data && combineByCategory(data),
		[data]
	)

	const preparedLabelsExpense =
		preparedData
			?.filter(el => el.transactionType !== 'income')
			.map(el => el.category) ?? []
	const preparedLabelsIncome =
		preparedData
			?.filter(el => el.transactionType === 'income')
			.map(el => el.category) ?? []

	const preparedAmountIncome =
		preparedData
			?.filter(el => el.transactionType === 'income')
			.map(el => el.amount) ?? []
	const preparedAmountExpense =
		preparedData
			?.filter(el => el.transactionType !== 'income')
			.map(el => el.amount) ?? []

	const updateTable = useCallback(
		async (
			value: IUpdateTable,
			setState: React.Dispatch<React.SetStateAction<boolean>>
		) => {
			await updatePersonalTable(value)
			setState(false)
			refetch()
		},
		[refetch, updatePersonalTable]
	)

	const handleMonthChange = (newMonth?: Date) => {
		setSelectedMonth(newMonth ? formatDate(newMonth) : formatDate(new Date()))
	}

	return (
		<>
			{isLoading ? (
				<div>LOADING....</div>
			) : (
				<div className='personal-table'>
					<div className='personal-table__cash-flow'>
						<CashFlowMonitor
							updateTable={updateTable}
							totalExpense={preparedAmountExpense}
							totalIncome={preparedAmountIncome}
							handleMonthChange={handleMonthChange}
						/>
					</div>
					<div className='personal-table__charts'>
						{' '}
						<div className='personal-table__charts--chart'>
							<DoughnutChart
								labels={preparedLabelsIncome}
								amount={preparedAmountIncome}
								label='Income'
							/>
						</div>
						<div className='personal-table__charts--chart'>
							<DoughnutChart
								labels={preparedLabelsExpense}
								amount={preparedAmountExpense}
								label='Expense'
							/>
						</div>
					</div>
					<div className='personal-table__cash-flow-graph'>
						<CashFlowGraph />
					</div>
					<div className='personal-table__cash-flow-list'>
						<CashFlowList />
					</div>
				</div>
			)}
		</>
	)
}
