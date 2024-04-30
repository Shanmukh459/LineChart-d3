export const AxisBottom = ({ xScale, innerHeight, xAxisTickFormat}) => 
xScale.ticks().map((tickValue) => (
  <g key={tickValue} className="tick" transform={`translate(${xScale(tickValue)},0)`}>
    <line y2={innerHeight} stroke="black" />
    <text
      style={{ textAnchor: 'middle' }}
      y={innerHeight + 5}
      dy="0.71em"
    >{xAxisTickFormat(tickValue)}</text>
  </g>
))