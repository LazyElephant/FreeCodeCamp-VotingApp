import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  fetch as apiFetch
} from '../actions'

class CreatePoll extends Component {
  constructor() {
    super()

    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      title: '',
      options: [
        '',
        '',
        '',
      ]
    }
  }
  
  componentDidMount() {
    this.formRef.title.focus()
  }
  
  async submit(e) {
    e.preventDefault()
    // TODO: validate form data
    let { title, options } = this.state
    options = options.filter(option => option !== '') 

    this.props.apiFetch('create', { title, options })
  }

  handleChange(e) {
    e.preventDefault()

    let title = this.formRef.title.value
    let options = Array.from(this.formRef.options).map(el => el.value)
    if (this.state.options.length === options.length && options[options.length-1] !== '')
      options.push('')
    this.setState({title, options})
  }

  render() {
    const { title, options } = this.state
    return (
      <div className="container mt-5">
        <h1>Create a Poll</h1>
        <form 
          className="form"
          onSubmit={this.submit}
          name="create" 
          ref={(r) => this.formRef = r}
        >
          <div className="form-group">
            <label 
              className="form-label"
              htmlFor="title"
              >
              Title 
              <input 
                className="form-control"
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
               />
            </label>
          </div>
          <div className="form-group">
            <label
              className="form-label"
            >
              Options 
              {
                options.map((option, i) =>
                  <input
                    key={`option-${i+1}`}
                    className="form-control"
                    type="text"
                    name="options"
                    value={option}
                    onChange={this.handleChange}
                  /> 
                )
                
              }
            </label>
          </div>
          <button 
            className="btn btn-primary"
            type="submit"
          >
            Make my Poll!
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  apiFetch
}

export default connect(null, mapDispatchToProps)(CreatePoll)