import { line, curveNatural } from "d3";

export const Marks = ({
  xScale,
  yScale,
  xValue,
  yValue,
  data,
  tooltipFormat,
}) => (
  <g className="marks">
    <path
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        (data)}
    />
    {data.map((d) => (
      <circle
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={2}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    ))}
    ;
  </g>
);
