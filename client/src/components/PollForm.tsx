import * as React from 'react'
import { PollData } from '../typings'

interface Props {
  options: PollData[]
  onSubmit: (option: string) => void
}

class PollForm extends React.Component<Props, any> {
  state = {
    selectedValue: ''
  }

  constructor(props: Props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e: any) {
    e.preventDefault()
    if (this.state.selectedValue) {
      this.props.onSubmit(this.state.selectedValue)
    }
  }
  
  onChange(e: any) {
    this.setState({selectedOption: e.target.value})
  }

  render() {
    const { options } = this.props

    return (
      <form 
        onSubmit={this.onSubmit}
        className="col-sm-6"
      >
        {
          options.map((option, index) => {
            return (
              <div key={index} className="form-check">
                <label className="form-check-label">
                  <input 
                    onChange={this.onChange}
                    type="radio" 
                    className="form-check-input" 
                    name="options"
                    value={option.name}
                  />
                  {option.name}
                </label>
              </div>
            )
          })
        }
        <button 
          type="submit" 
          className="btn btn-primary mt-3"
        >
          Vote
        </button>
      </form>
    )
  }
}
export default PollForm