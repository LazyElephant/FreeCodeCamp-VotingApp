import * as React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { ChartData } from '../typings'

const Chart = ({data}:{data:ChartData[]}) => {
  const sum = data.reduce((sum: number, poll: ChartData) => sum + poll.value, 0)

  if (sum === 0) {
    return (
      <div className="col-sm-6">
        <p>Be the first to vote on this poll!</p>
      </div>
    )
  }
  else {
    return (
      <div className="col-sm-6">
        <PieChart width={500} height={500}>
          <Pie data={data} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
          <Tooltip />
        </PieChart>
      </div>
    )
  }
}

export default Chart