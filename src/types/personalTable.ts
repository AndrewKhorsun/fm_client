export interface IUpdateTable {
	transactionType: string
	amount: string
	category: string
	totalBudget: number
}

export interface IPersonalTable {
	id: number
	category: string
	amount: number
	userId: number
	transactionType: string
	createdAt: string
	updatedAt: string
	totalBudget: number
}
