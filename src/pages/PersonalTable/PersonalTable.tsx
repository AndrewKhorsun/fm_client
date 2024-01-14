import { useCallback, useMemo, useState } from 'react'
import { Button } from '../../components/atoms/button/Button'
import {
	useGetTableQuery,
	useUpdateTableMutation
} from '../../redux/rtkQuery/personalTableSlice'
import './personalTable.scss'
import { TableModal } from '../../components/molecules/TableModal/TableModal'
import {
	expenseCategoryOptions,
	incomeCategoryOptions
} from '../../utils/constants/tableConstants'
import { IUpdateTable } from '../../types/personalTable'
import {
	CombinedTransaction,
	combineByCategory
} from '../../utils/scripts/combineCategories'
import { DoughnutChart } from '../../components/atoms/charts/Doughnut/DoughnutChart'
import { CashFlowMonitor } from '../../components/organism/CashFlowMonitor/CashFlowMonitor'
import { CashFlowGraph } from '../../components/organism/CashFlowGraph/CashFlowGraph'
import { CashFlowList } from '../../components/organism/CashFlowList/CashFlowList'

export const PersonalTablePage = () => {
	const [updatePersonalTable] = useUpdateTableMutation()
	const { data, refetch, isLoading } = useGetTableQuery(null)
	const [incomeModal, setIncomeModal] = useState<boolean>(false)
	const [expenseModal, setExpenseModal] = useState<boolean>(false)

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

	return (
		<>
			{isLoading ? (
				<div>LOADING....</div>
			) : (
				<div className='personal-table'>
					<div className='personal-table__cash-flow'>
						<CashFlowMonitor />
						<Button onClick={() => setIncomeModal(true)}>Income</Button>{' '}
						<Button onClick={() => setExpenseModal(true)}>Expense</Button>
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
		</>
	)
}
