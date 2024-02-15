import { ModalBox } from '../../atoms/modalBox'
import './tableModal.scss'
import { inputHandler } from '../../../utils/scripts/inputHandler'
import { Button } from '../../atoms/button/Button'
import { useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { formatNumber } from '../../../utils/scripts/formatNumber'
import { IUpdateTable } from '../../../types/personalTable'

interface OptionType {
	value: string
	label: string
}

interface Props extends React.HTMLAttributes<HTMLElement> {
	buttonText: string
	isOpenModal: boolean
	onCloseModal: React.Dispatch<React.SetStateAction<boolean>>
	updateTable: (
		value: IUpdateTable,
		setState: React.Dispatch<React.SetStateAction<boolean>>
	) => Promise<void>
	categoryOptions: OptionType[]
	categoryType: string
}

export const TableModal = (props: Props) => {
	const {
		categoryOptions,
		onCloseModal,
		updateTable,
		buttonText,
		categoryType
	} = props

	const initialData = {
		category: '',
		amount: '',
		transactionType: categoryType,
		totalBudget: 0
	}

	const [transactionData, setTransactionData] =
		useState<IUpdateTable>(initialData)

	const [selectedOption, setSelectedOption] =
		useState<SingleValue<OptionType>>(null)

	const handleSelectChange = (newValue: SingleValue<OptionType>) => {
		setTransactionData(prev => ({ ...prev, category: newValue?.value ?? '' }))
		setSelectedOption(newValue)
	}
	const onClickButton = () => {
		setSelectedOption(null)
		setTransactionData(initialData)
		updateTable(transactionData, onCloseModal)
	}

	return (
		<ModalBox {...props}>
			<input
				className='table-modal__input'
				type='text'
				value={transactionData.amount ?? ''}
				onChange={e =>
					inputHandler(
						formatNumber(e.target.value),
						setTransactionData,
						'amount'
					)
				}
			/>
			<Select
				options={categoryOptions}
				value={selectedOption}
				onChange={handleSelectChange}
			/>
			<Button className='table-modal__add-btn' onClick={() => onClickButton()}>{buttonText}</Button>
		</ModalBox>
	)
}
