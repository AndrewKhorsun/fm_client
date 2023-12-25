import { useCallback, useMemo, useState } from 'react'
import { Button } from '../../components/atoms/button/Button'
import {
	useGetTableQuery,
	useUpdateTableMutation
} from '../../redux/rtkQuery/personalTableSlice'
import './personalTable.scss'
import { TableModal } from '../../components/organism/TableModal/TableModal'
import {
	expenseCategoryOptions,
	incomeCategoryOptions
} from '../../utils/constants/tableConstants'
import { IUpdateTable } from '../../types/personalTable'
import {
	CombinedTransaction,
	combineByCategory
} from '../../utils/scripts/combineCategories'
import { formatLargeNumber } from '../../utils/scripts/formatLargeNumber'

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

	return (
		<>
			<h1>Personal table</h1>
			{isLoading ? <div>LOADING....</div> :			<div className='test'>
				{preparedData?.map(el => {
					const classType = el.transactionType === 'income' ? 'green' : 'red'
					return (
						<div key={el.category}>
							<h1 className={`title--color-${classType}`}>{el.category}</h1>
							<div>{` Amount: ${formatLargeNumber(el.amount)}`}</div>
						</div>
					)
				})}

				<Button onClick={() => setIncomeModal(true)}>Income</Button>
				<Button onClick={() => setExpenseModal(true)}>Expense</Button>
			</div>}


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
