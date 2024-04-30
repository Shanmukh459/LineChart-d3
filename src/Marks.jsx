export const Marks = ({ xScale, yScale, xValue, yValue, data, tooltipFormat }) => 
data.map((d) => (
  <circle 
    className="marks"
    cx={xScale(xValue(d))}
    cy={yScale(yValue(d))}
    r={5}
  >
    <title>{tooltipFormat(xValue(d))}</title>
  </circle>
))