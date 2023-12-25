export const formatLargeNumber = (num: number, threshold = 1000) => {
	if (num >= threshold) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
	return num.toString()
}
