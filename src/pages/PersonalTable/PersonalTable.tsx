import { useActions } from '../../hooks/useActions'
import { useGetTableQuery } from '../../redux/apiRTKQ/api'
export const PersonalTablePage = () => {
	const { data, isLoading, refetch } = useGetTableQuery(null)
	const { refresh } = useActions()
	if (isLoading) return <div>LOADING....</div>

	const test = async () => {
		console.log('test')

		refresh()
	}

	return (
		<>
			<h1>Personal table</h1>
			<button onClick={() => refetch()}>{`Refetch`}</button>
			<button onClick={() => test()}>{`Refetch`}</button>

			<br />
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
		</>
	)
}
