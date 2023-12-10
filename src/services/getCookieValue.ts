export function getRefreshTokenFromCookie(key: string) {
	const cookies = document.cookie.split(';').map(cookie => cookie.trim())
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=')
		if (name.trim() === key) {
			return value
		}
	}
	return null
}
