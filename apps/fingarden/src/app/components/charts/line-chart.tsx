'use client'

import { ChartData, ChartOptions } from 'chart.js'
import { Line } from 'react-chartjs-2'

import { DataPoint, mergeOptions } from './chart'

type LineChartData = ChartData<'line', Array<DataPoint>, string>

const baseOptions: ChartOptions<'line'> = {
  responsive: true,
  elements: {
    line: {
      tension: 0.3,
      fill: true,
      borderWidth: 1,
    },
  },
}

type Props = {
  datasets: LineChartData['datasets']
  title?: string
  legend?: boolean
  scales?: boolean
  grid?: boolean
  ticks?: boolean
  pointRadius?: number
  fill?: boolean
  tension?: number
  borderWidth?: number
  className?: string
}

export const LineChart = ({
  datasets,
  title,
  legend = false,
  scales = false,
  grid = false,
  ticks = false,
  fill = false,
  tension = 0.3,
  borderWidth = 1,
  pointRadius = 0,
  className,
}: Props) => {
  const options = mergeOptions(baseOptions, {
    elements: {
      point: { radius: pointRadius },
      line: { tension, fill, borderWidth },
    },
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
      },
      y: {
        display: scales,
        grid: { display: grid },
        ticks: { display: ticks },
      },
    },
  })

  return <Line className={className} options={options} data={{ datasets }} />
}
