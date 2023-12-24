import { useState } from 'react'
import { Button } from '../../components/atoms/button/Button'
import { useGetTableQuery } from '../../redux/rtkQuery/personalTableSlice'
import './personalTable.scss'
import { ModalBox } from '../../components/atoms/ModalBox'

export const PersonalTablePage = () => {
	const { data, isLoading } = useGetTableQuery(null)
	const [incomeModal, setIncomeModal] = useState<boolean>(false)
	const [expenseModal, setExpenseModal] = useState<boolean>(false)

	if (isLoading) return <div>LOADING....</div>
	return (
		<>
			<h1>Personal table</h1>
			<div className='test'>
				{data?.map((el, index) => {
					const lastEl = index === data.length - 1
					return (
						<div key={el.createdAt}>
							<h1>{el.category}</h1>
							<div>{el?.userId}</div>
							<div>{` Amount: ${el.amount}`}</div>
							<div>{el.createdAt}</div>
							{!lastEl && <div>--------------------</div>}
						</div>
					)
				})}
			</div>

			<ModalBox onCloseModal={setIncomeModal} isOpenModal={incomeModal}>
				<h1>setIncomeModal</h1>
			</ModalBox>
			<ModalBox onCloseModal={setExpenseModal} isOpenModal={expenseModal}>
				<h1>setExpenseModal</h1>
			</ModalBox>

			<Button onClick={() => setIncomeModal(true)}>Income</Button>
			<Button onClick={() => setExpenseModal(true)}>Expense</Button>
		</>
	)
}
