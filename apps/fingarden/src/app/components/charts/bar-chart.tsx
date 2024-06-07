'use client'

import { formatBalance } from '@/utils'
import { ChartData, ChartOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { DataPoint, isDataPoint, mergeOptions } from './chart'

type BarChartData = ChartData<'bar', Array<DataPoint>, string>

const baseOptions: ChartOptions<'bar'> = {
  datasets: {
    bar: { maxBarThickness: 25 },
  },
  plugins: {
    tooltip: {
      callbacks: {
        footer: (contexts) => {
          const context = contexts[0]

          if (context?.chart?.data?.datasets?.length <= 1) return

          const datasets = context.chart.data.datasets
          const dataIndex = context.dataIndex

          const value = datasets.reduce((acc, dataset) => {
            const data = dataset.data[dataIndex]
            if (!isDataPoint(data)) return acc
            return acc + data.y
          }, 0)

          const formattedTotal = formatBalance({ value })

          return `Total: ${formattedTotal}`
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (rawValue) => {
          const value = parseFloat(rawValue.toString())
          if (isNaN(value)) return rawValue
          return formatBalance({ value, precision: 1, scale: 'k' })
        },
      },
    },
  },
}

type Props = {
  datasets: BarChartData['datasets']
  title?: string
  responsive?: boolean
  legend?: boolean
  scales?: boolean
  grid?: boolean
  ticks?: boolean
  stacked?: boolean
  aspectRatio?: number
  className?: string
}

export const BarChart = ({
  datasets,
  className,
  title,
  responsive = true,
  legend = false,
  scales = false,
  grid = false,
  ticks = false,
  stacked = false,
  aspectRatio = 16 / 9,
}: Props) => {
  const options = mergeOptions(baseOptions, {
    responsive,
    aspectRatio,
    plugins: {
      title: {
        display: Boolean(title),
        text: title,
      },
      legend: { display: legend },
    },
    scales: {
      x: {
        display: scales,
        grid: { display: grid },
        ticks: { display: ticks },
        stacked,
      },
      y: {
        display: scales,
        grid: { display: grid },
        ticks: { display: ticks },
        stacked,
      },
    },
  })

  return <Bar className={className} options={options} data={{ datasets }} />
}
