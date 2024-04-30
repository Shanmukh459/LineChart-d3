import { scaleLinear, scaleTime, extent, timeFormat } from 'd3'
import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'

const height = 500
const width = 960

const margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 90
}

function App() {
  const data = useData()

  if(!data) {
    return <h1>Loading...</h1>
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xValue = (d) => d.timestamp
  const yValue = (d) => d.temperature

  const xAxisTickFormat = timeFormat("%a")

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()

  console.log(xAxisTickFormat(xScale.ticks()[3]))
  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} xAxisTickFormat={xAxisTickFormat} />
        <text
          className='axis-label'
          x={innerWidth/2}
          y={innerHeight+40}
          textAnchor='middle'
        >Time</text>
        <AxisLeft innerWidth={innerWidth} yScale={yScale} />
        <text
          className='axis-label'
          textAnchor='middle'
          transform={`translate(-40, ${innerHeight/2}) rotate(-90)`}
        >Temperature</text>
        {data.map((d) => (
          <circle 
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={5}
            fill='#137b80'
          >
          </circle>
        ))}
      </g>

    </svg>
  )
}
export default App
