import * as React from 'react';

class Login extends React.Component<any, any> {
  private username: any;
  private password: any;

  submit = (e: any) => {
    e.preventDefault();
    // TODO: validate form data
    const username = this.username.value;
    const password = this.password.value;

    fetch('/api/login', {
      headers: [
        ['Accept', 'application/json'],
        ['Content-Type', 'application/json']
      ],
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
    .then(res => res.json())
    .then(console.log);
  }

  render() {
    return (
      <form onSubmit={this.submit} name="loginForm">
        <label htmlFor="username">Username
          <input type="text" name="username" ref={r => this.username = r}/>
        </label>
        <label htmlFor="password">Password
          <input type="password" name="password" ref={r => this.password = r} />
        </label>
        <button type="submit">Log in</button>
      </form>
    );
  }
}

export default Login;