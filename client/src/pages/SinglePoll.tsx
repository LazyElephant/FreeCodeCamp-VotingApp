import * as React from 'react';

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
    return (
      <div>
        <h1>{title}</h1>
        <p>{owner}</p>
        <ul>
          {
            Object
              .keys(options)
              .map((k: string, i: number) => 
                <li key={i}>
                  {k} : {options[k]}
                </li>)
          }
        </ul>
      </div>
    );
  }
}

export default SinglePoll;