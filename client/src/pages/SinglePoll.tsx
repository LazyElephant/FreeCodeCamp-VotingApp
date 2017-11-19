import * as React from 'react';

interface PollState {
  options: any;
  owner: string;
  title: string;
}

class SinglePoll extends React.Component<any, PollState> {
  public static defaultProps = {
    owner: '',
    title: '',
    options: {}
  };

  constructor(props: any) {
    super(props);
    const {poll} = this.props.location && this.props.location.state;
    const {options, owner, title} = poll || this.props;
    this.state = {
      options,
      owner,
      title
    };
  }
  render() {
    const {title, owner, options} = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>by {owner}</p>
        <ul>
          {
            Object
              .keys(options)
              .map((opt: string, i: number) => <li key={i}>{opt}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default SinglePoll;