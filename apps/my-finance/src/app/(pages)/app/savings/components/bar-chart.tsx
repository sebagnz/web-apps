'use client'

import { BarElement, CategoryScale, ChartData, Chart as ChartJS, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type DataPoint = { x: string; y: number }
type BarChartData = ChartData<'bar', Array<DataPoint>, string>
type BarChartOptions = ChartOptions<'bar'>

const gridColor = 'rgba(200, 200, 200, .1)'

const positivePrimaryColor = 'rgba(59, 7, 100, .8)'
const positiveSecondaryColor = 'rgba(59, 7, 100, .6)'

const negativeBarColor = 'rgba(200, 7, 7, .8)'

const barOptions: BarChartOptions = {
  responsive: true,
  elements: {
    bar: {
      backgroundColor: (context) => {
        if (context?.parsed?.y < 0) return negativeBarColor
        return context?.datasetIndex % 2 === 0 ? positivePrimaryColor : positiveSecondaryColor
      },
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
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        callback: (rawValue) => {
          const value = parseFloat(rawValue.toString())
          if (isNaN(value)) return rawValue
          return `€ ${value / 1000}k`
        },
      },
      grid: { color: gridColor },
    },
  },
}

type BarChartProps = { datasets: BarChartData['datasets'] }

export const BarChart = ({ datasets }: BarChartProps) => {
  return <Bar options={barOptions} data={{ datasets }} />
}
