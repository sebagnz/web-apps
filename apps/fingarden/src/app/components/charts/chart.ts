import { cssVar } from '@/utils'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import merge from 'lodash/merge'

ChartJS.defaults.font.weight = 500

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend)
ChartJS.register(PointElement, LineElement, Filler)
ChartJS.register(BarElement)

export type DataPoint = { x: string; y: number }
export const isDataPoint = (data: any): data is DataPoint => data.x && data.y

const gridColor = () => `rgb(${cssVar('--color-accent-100')})`

const positivePrimaryColor = () => `rgb(${cssVar('--color-accent-500')})`
const positivePrimaryBgColor = () => `rgb(${cssVar('--color-accent-500')} / .1)`

const positiveSecondaryColor = () => `rgb(${cssVar('--color-accent-300')})`
const positiveSecondaryBgColor = () => `rgb(${cssVar('--color-accent-300')} / .1)`

const negativeColor = () => `rgb(${cssVar('--color-error-500')})`
const negativeBgColor = () => `rgb(${cssVar('--color-error-500')} / .1)`

const BASE_OPTIONS: ChartOptions = {
  responsive: true,
  elements: {
    bar: {
      backgroundColor: (context) => {
        if (context?.parsed?.y < 0) return negativeColor()
        return context?.datasetIndex % 2 === 0 ? positivePrimaryColor() : positiveSecondaryColor()
      },
    },
    line: {
      borderColor: (context) => {
        if (context?.parsed?.y < 0) return negativeColor()
        else return positivePrimaryColor()
      },
      backgroundColor: (context) => {
        if (context?.parsed?.y < 0) return negativeBgColor()
        else return positivePrimaryBgColor()
      },
    },
  },
  plugins: {
    title: { font: { family: 'inherit' } },
  },
  scales: {
    x: { grid: { color: gridColor } },
    y: { grid: { color: gridColor } },
  },
}

export const mergeOptions = <TChartTypeOptions extends ChartOptions>(
  chartBase: TChartTypeOptions,
  override?: Partial<TChartTypeOptions>,
): TChartTypeOptions => {
  return merge({}, BASE_OPTIONS, chartBase, override)
}
