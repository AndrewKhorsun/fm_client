import { useCallback, useMemo, useState } from 'react'
import './periodCalendar.scss'
import moment from 'moment'
import Calendar from 'react-calendar'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'

interface Props {
	handleMonthChange: (newMonth: Date) => void
}

export const PeriodCalendar = (props: Props) => {
	const { handleMonthChange } = props
	const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false)
	const [dateCalendar, setDateCalendar] = useState<string>(
		moment(new Date()).format('MMMM YYYY')
	)

	const openCalendarClass = useMemo(
		() => (isOpenCalendar ? 'open' : ''),
		[isOpenCalendar]
	)

	const onClickDate = useCallback(
		(date: Date) => {
			setIsOpenCalendar(false)
			setDateCalendar(moment(date).format('MMMM YYYY'))
			handleMonthChange(date)
		},
		[handleMonthChange]
	)

	return (
		<div className='period-calendar'>
			<button
				onClick={() => setIsOpenCalendar(!isOpenCalendar)}
				className='period-calendar__button'
			>
				{dateCalendar}
				{isOpenCalendar ? <SlArrowUp /> : <SlArrowDown />}
			</button>

			<Calendar
				className={`period-calendar__calendar ${openCalendarClass}`}
				next2Label={null}
				prev2Label={null}
				view='year'
				onClickMonth={e => onClickDate(e)}
			/>
		</div>
	)
}
