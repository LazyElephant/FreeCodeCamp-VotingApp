import * as React from 'react';
import { PollData } from '../typings';

const PollForm = ({options}:{options: PollData[]}) => (
  <form className="col-sm-6">
  {
    options.map((option, index) => {
      return (
        <div className="form-check">
          <input type="radio" className="form-check-input" name={`radio-${index}`}/>
          <label className="form-check-label" htmlFor={`radio-${index}`}>{option.name}</label>
        </div>
      )
    })
  }
  <button type="submit" className="btn btn-primary mt-3">Vote</button>
</form>
)

export default PollForm