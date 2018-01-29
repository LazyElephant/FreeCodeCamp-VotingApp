import * as React from 'react'

type EventHandler = (e: any) => void

class CreatePoll extends React.Component<any, any> {
  async submit(e: any) {
    e.preventDefault()
    // TODO: validate form data
    const title = e.target.title.value
    let options = e.target.options.value
    options = Array.isArray(options) ? options : [options]

    try {
      const res = await fetch('/api/polls/create', {
          headers: [
            ['Accept', 'application/json'],
            ['Content-Type', 'application/json']
          ],
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({title, options}),
        })

      if (res.status === 401) {
        return this.props.history.push('/login')
      }
      
      const json = await res.json()
      this.props.history.push(`/polls/${json.poll._id}`)
    } catch ( e ) {
      // do something here
    }
  }

  render() {
    return (
      <div>
        <h1>Create a Poll</h1>
        <PollForm submit={this.submit} />
      </div>
    )
  }
}

const PollForm = ({submit}: {submit: EventHandler}) => (
  <form onSubmit={submit} name="create">
    <label htmlFor="title">Title 
      <input type="text" name="title" />
    </label>
    <label htmlFor="options">Options 
      <input type="text" name="options"/>
    </label>
    <button type="submit">Make my Poll!</button>
  </form>
)

export default CreatePoll