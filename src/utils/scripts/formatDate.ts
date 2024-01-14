import moment from 'moment'

export const formatDate = (value: Date) => {
	return moment(value).format('YYYY-MM-DD')
}
