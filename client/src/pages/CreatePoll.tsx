import * as React from 'react';

type EventHandler = (e: any) => void;

class CreatePoll extends React.Component<any, any> {
  submit = (e: any) => {
    e.preventDefault();
  
    fetch('/api/polls/create', {
      headers: [
        ['Accept', 'application/json'],
        ['Content-Type', 'application/json']
      ],
      method: 'POST',
      body: JSON.stringify({title: 'lazyelephants poll', options: ['blah']}),
    })
    .then((res: any) => {
      if (res.status === 401) {
        this.props.history.push('/login');
      }
      return res.json();
    })
    .then(json => {
      this.props.history.push(`polls/${json.poll._id}`);
    });
  }

  render() {
    return (
      <div>
        <h1>Create a Poll</h1>
        <PollForm submit={this.submit} />
      </div>
    );
  }
}

const PollForm = ({submit}: {submit: EventHandler}) => (
  <form onSubmit={submit}>
    <label htmlFor="title">Title 
      <input type="text" name="title" />
    </label>
    <label htmlFor="options">Options 
      <input type="text" name="options"/>
    </label>
    <button type="submit">Make my Poll!</button>
  </form>
);

export default CreatePoll;