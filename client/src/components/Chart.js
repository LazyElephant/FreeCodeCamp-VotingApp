import * as React from 'react'
import { PieChart, Pie, Tooltip } from 'recharts'

const Chart = ({data}) => {
  const totalVotes = data.reduce((sum, option) => sum + option.value, 0)
  if (totalVotes === 0) {
    return (
      <div className="col-sm-6">
        <p>Be the first to vote on this poll!</p>
      </div>
    )
  } else {
    return (
      <div className="col-sm-6">
        <PieChart width={200} height={300}>
          <Pie dataKey="value" data={data} cx={100} cy={100} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
          <Tooltip />
        </PieChart>
      </div>
    )
  }
}

export default Chart