import { IPersonalTable } from '../../types/personalTable'

export interface CombinedTransaction {
	category: string
	amount: number
	transactionType: string
}

export const combineByCategory = (
	data: IPersonalTable[]
): CombinedTransaction[] => {
	const combinedData: { [key: string]: CombinedTransaction } = {}

	data.forEach(entry => {
		const key = entry.category
		if (!combinedData[key]) {
			combinedData[key] = {
				category: entry.category,
				amount: entry.amount,
				transactionType: entry.transactionType
			}
		} else {
			combinedData[key].amount += entry.amount
		}
	})

	return Object.values(combinedData)
}
