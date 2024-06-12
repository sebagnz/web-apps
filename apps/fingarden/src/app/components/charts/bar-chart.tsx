'use client'

import { ChartData, ChartOptions, TooltipItem } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { DataPoint, isDataPoint, mergeOptions } from './chart'

type BarChartData = ChartData<'bar', Array<DataPoint>, string>

const baseOptions: ChartOptions<'bar'> = { datasets: { bar: { maxBarThickness: 25 } } }

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
  getTooltipFooter?: (value: number) => string | null
  getYTicks?: (value: number) => string | null
}

const defaultGetTooltipFooter: Props['getTooltipFooter'] = (value) => value.toString()
const defaultGetYTicks: Props['getYTicks'] = (value) => value.toString()

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
  getTooltipFooter = defaultGetTooltipFooter,
  getYTicks = defaultGetYTicks,
}: Props) => {
  const tooltipFooter = (contexts: Array<TooltipItem<'bar'>>): string => {
    const context = contexts[0]

    if (context?.chart?.data?.datasets?.length <= 1) return ''

    const datasets = context.chart.data.datasets
    const dataIndex = context.dataIndex

    const value = datasets.reduce((acc, dataset) => {
      const data = dataset.data[dataIndex]
      if (!isDataPoint(data)) return acc
      return acc + data.y
    }, 0)

    const formattedTotal = getTooltipFooter(value)

    return formattedTotal ? `Total: ${formattedTotal}` : value.toString()
  }

  const yTicks = (rawValue: string | number): string => {
    const value = parseFloat(rawValue.toString())
    if (isNaN(value)) return rawValue.toString()
    return getYTicks(value) || value.toString()
  }

  const options = mergeOptions(baseOptions, {
    responsive,
    aspectRatio,
    plugins: {
      title: {
        display: Boolean(title),
        text: title,
      },
      legend: { display: legend },
      tooltip: {
        callbacks: {
          footer: tooltipFooter,
        },
      },
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
        ticks: { display: ticks, callback: yTicks },
        stacked,
      },
    },
  })

  return <Bar className={className} options={options} data={{ datasets }} />
}
