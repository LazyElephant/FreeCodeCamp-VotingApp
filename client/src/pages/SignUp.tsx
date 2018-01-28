import * as React from 'react';

class SignUp extends React.Component<any, any> {
  private username: any;
  private password: any;

  constructor(props: any) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  async submit(e: any) {
    e.preventDefault();
    // TODO: validate form data
    const username = this.username.value;
    const password = this.password.value;

    try {
      const res = await fetch('/api/signup', {
          headers: [
            ['Accept', 'application/json'],
            ['Content-Type', 'application/json']
          ],
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({username, password}),
        });
      
      if (res.status !== 200) {
        // display error message
      } 

    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <h2 className="mb-4">Sign Up</h2>
        <form 
          onSubmit={this.submit} 
          name="loginForm">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              className="form-control"
              type="text"  
              name="username" 
              ref={r => this.username = r}/>
          </div>
          <div className="form-group">
            <label htmlFor="password form-label">Password</label>
            <input 
              className="form-control"
              type="password"
              name="password" 
              ref={r => this.password = r} />
          </div>
          <button 
            className="btn btn-primary"
            type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;