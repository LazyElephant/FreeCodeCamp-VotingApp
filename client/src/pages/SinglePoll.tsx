import * as React from 'react'
import Chart from '../components/Chart';
import PollForm from '../components/VoteForm';

class SinglePoll extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      owner: '',
      title: '',
      options: {}
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;

    fetch(`/api/polls/${id}`)
      .then(res => res.json())
      .then(json => this.setState(json.poll));
  }

  render() {
    const {title, owner, options} = this.state;
    const optionsArray = Object.keys(options).map(key => ({name: key, value: options[key]}))
    return (
      <div className="container">
        <h1 className="mt-5">{title}</h1>
        <p>by {owner}</p>
        <hr />
        <div className="row align-items-center mt-5" >
          <PollForm options={optionsArray} />
          <Chart data={optionsArray} />
        </div>
      </div>
    );
  }
}

export default SinglePoll;


// const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
//                   {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
//                   {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

// const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
//                   {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
//                   {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

// const TwoSimplePieChart = React.createClass({
// 	render () {
//   	return (
//     	<PieChart width={800} height={400}>
//         <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
//         <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
//         <Tooltip/>
//        </PieChart>
//     );
//   }
// })

// ReactDOM.render(
//   <TwoSimplePieChart />,
//   document.getElementById('container')
// );