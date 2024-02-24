import { FC, HTMLAttributes } from 'react'
import { Size } from '../Size'

export const Star: FC<
  HTMLAttributes<HTMLOrSVGElement> & {
    size: keyof typeof Size
    filled?: boolean
  }
> = ({ size, filled, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    style={{
      fill: filled ? '#ffa41c' : 'white',
      stroke: '#e07922',
      verticalAlign: 'middle',
      width: Size[size],
      height: Size[size],
    }}
    {...props}
  >
    <g>
      <path d="M 22 9.24 l -7.19 -0.62 L 12 2 L 9.19 8.63 L 2 9.24 l 5.46 4.73 L 5.82 21 L 12 17.27 L 18.18 21 l -1.63 -7.03 L 22 9.24 z z"></path>
    </g>
  </svg>
)

export const HalfStar: FC<
  HTMLAttributes<HTMLOrSVGElement> & {
    size: keyof typeof Size
  }
> = ({ size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    style={{
      fill: '#ffa41c',
      stroke: '#e07922',
      verticalAlign: 'middle',
      width: Size[size],
      height: Size[size],
    }}
    {...props}
  >
    <g>
      <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27l6.18 3.73-1.63-7.03L22 9.24z"></path>
      <path stroke="none" fill="white" d="M22.092 9.168zM12 15.4V3.013L14.628 9.128 21.571 9.476 15.943 13.847 17.948 20.605 12.001 16.554z"></path>
    </g>
  </svg>
)
