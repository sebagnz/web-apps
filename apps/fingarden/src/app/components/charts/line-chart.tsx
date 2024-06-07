'use client'

import { ChartData, ChartOptions, FillTarget } from 'chart.js'
import { Line } from 'react-chartjs-2'

import { DataPoint, mergeOptions } from './chart'

type LineChartData = ChartData<'line', Array<DataPoint>, string>
type LineChartOptions = ChartOptions<'line'>

const baseOptions: LineChartOptions = {
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 1,
    },
  },
}

type Props = {
  datasets: LineChartData['datasets']
  title?: string
  responsive?: boolean
  legend?: boolean
  scales?: boolean
  grid?: boolean
  ticks?: boolean
  fill?: FillTarget
  tension?: number
  borderWidth?: number
  pointRadius?: number
  aspectRatio?: number
  className?: string
}

export const LineChart = ({
  datasets,
  title,
  responsive = true,
  legend = false,
  scales = false,
  grid = false,
  ticks = false,
  fill = false,
  tension = 0.3,
  borderWidth = 1,
  pointRadius = 0,
  aspectRatio = 16 / 9,
  className,
}: Props) => {
  const options = mergeOptions(baseOptions, {
    responsive,
    aspectRatio,
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
    layout: {
      padding: {
        bottom: -8,
        left: -8,
      },
    },
    scales: {
      x: {
        display: scales,
        grid: { display: grid },
        ticks: { display: ticks, padding: 0 },
      },
      y: {
        display: scales,
        grid: { display: grid },
        ticks: { display: ticks, padding: 0 },
      },
    },
  })

  return <Line className={className} options={options} data={{ datasets }} />
}
