import { csv, scaleLinear, scaleTime, extent, timeFormat } from 'd3'
import { useEffect, useState } from 'react'

const height = 500
const width = 960

const margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 90
}

const csvUrl = 'https://gist.githubusercontent.com/Shanmukh459/27f13633f752d5aee204e30f2cfa7ffd/raw/528fb9593330b7f7ff9bca16a1ac273bfb01191e/week_temperature_sf.csv'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const row = (d) => {
      d.timestamp = new Date(d.timestamp)
      d.temperature = +d.temperature
      return d
    }
    csv(csvUrl, row).then(setData)
  }, [])

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
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke="black" />
            <text
              style={{ textAnchor: 'middle' }}
              y={innerHeight + 5}
              dy="0.71em"
            >{xAxisTickFormat(tickValue)}</text>
          </g>
        ))}
        <text
          className='axis-label'
          x={innerWidth/2}
          y={innerHeight+40}
          textAnchor='middle'
        >Time</text>
        {yScale.ticks().map(tickValue => (
          <g transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth} stroke="black" />
            <text
              style={{ textAnchor: 'end' }}
              x={-5}
              dy="0.32em"
            >{tickValue}</text>
          </g>
        ))}
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
