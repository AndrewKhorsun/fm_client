import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

interface Props {
	labels: string[]
	label: string
	amount: number[]
}

export const DoughnutChart = (props: Props) => {
	ChartJS.register(ArcElement, Tooltip, Legend)
	const { labels, label, amount } = props

	const data = {
		labels: labels,
		datasets: [
			{
				label: label,
				data: amount,
				backgroundColor: [
          'rgb(255, 189, 209)',
          'rgb(255, 169, 125)',
          'rgb(204, 163, 255)',
          'rgb(163, 204, 255)',
          'rgb(255, 204, 163)',
          'rgb(163, 255, 204)',
          'rgb(255, 204, 204)',
          'rgb(204, 255, 204)',
          'rgb(204, 204, 255)',
          'rgb(255, 255, 153)',
          'rgb(255, 143, 198)',
          'rgb(143, 255, 255)',
          'rgb(255, 143, 143)',
          'rgb(143, 255, 143)',
          'rgb(255, 223, 143)',
          'rgb(143, 255, 223)',
          'rgb(223, 143, 255)',
          'rgb(255, 189, 223)',
          'rgb(189, 255, 223)',
          'rgb(223, 255, 189)',
        ],
				hoverOffset: 4
			}
		]
	}

	return <Doughnut data={data} />
}
