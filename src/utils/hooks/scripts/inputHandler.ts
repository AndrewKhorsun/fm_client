export const inputHandler = <T>(
	event: React.ChangeEvent<HTMLInputElement>,
	setState: React.Dispatch<React.SetStateAction<T>>,
	field: keyof T
) => {
	const data = event.target.value

	setState(prev => ({
		...prev,
		[field]: data
	}))
}
