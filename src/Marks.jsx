export const Marks = ({ xScale, yScale, xValue, yValue, data }) => 
data.map((d) => (
  <circle 
    cx={xScale(xValue(d))}
    cy={yScale(yValue(d))}
    r={5}
    fill='#137b80'
  >
  </circle>
))