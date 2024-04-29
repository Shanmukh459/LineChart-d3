import { csv } from 'd3'
import { useEffect, useState } from 'react'

const csvUrl = 'https://gist.githubusercontent.com/Shanmukh459/27f13633f752d5aee204e30f2cfa7ffd/raw/528fb9593330b7f7ff9bca16a1ac273bfb01191e/week_temperature_sf.csv'

export const useData = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const row = (d) => {
      d.timestamp = new Date(d.timestamp)
      d.temperature = +d.temperature
      return d
    }
    csv(csvUrl, row).then(setData)
  }, [])
  return data
}