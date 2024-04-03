import { BarElement, CategoryScale, ChartData, Chart as ChartJS, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type DataPoint = { x: string; y: number }
type BarChartData = ChartData<'bar', Array<DataPoint>, string>
type BarChartOptions = ChartOptions<'bar'>

const gridColor = 'rgba(200, 200, 200, .1)'
const positiveBarColor = 'rgba(59, 7, 100, .8)'
const negativeBarColor = 'rgba(200, 7, 7, .8)'

const barOptions: BarChartOptions = {
  responsive: true,
  elements: {
    bar: {
      backgroundColor: (context) => (context?.parsed?.y < 0 ? negativeBarColor : positiveBarColor),
    },
  },
  datasets: {
    bar: { maxBarThickness: 20 },
  },
  plugins: {
    title: { display: false },
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { color: gridColor },
    },
    y: {
      ticks: { callback: (value) => `€${value}` },
      grid: { color: gridColor },
    },
  },
}

type BarChartProps = { datasets: BarChartData['datasets'] }

export const BarChart = ({ datasets }: BarChartProps) => {
  return <Bar options={barOptions} data={{ datasets }} />
}
