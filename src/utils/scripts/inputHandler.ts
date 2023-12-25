export const inputHandler = <T>(
	value: string,
	setState: React.Dispatch<React.SetStateAction<T>>,
	field: keyof T
) => {
	setState(prev => ({
		...prev,
		[field]: value
	}))
}
