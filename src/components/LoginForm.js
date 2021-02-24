import React from "react";
import { Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import data from '../mock/users.json'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: false };
  }

  handleValidSubmit = (event, values) => {
    let auth = data.logins.findIndex(val => val.username === values.email && val.password === values.password);
    if (auth !== -1) {
      localStorage.setItem("user", JSON.stringify(data.logins[auth]));
      this.setState({ email: values.email });
      this.props.history.push("/search");
    } else {
      alert("Wrong Email or Password. Try Again")
    }
  };

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
  };

  render() {
    return (
      <AvForm
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
        <AvField
          name="email"
          label="Email"
          type="text"
          validate={{
            required: true,
            email: true
          }}
        />
        <AvField
          name="password"
          label="Password"
          type="password"
          validate={{
            required: {
              value: true,
              errorMessage: "Please enter your password"
            },
            pattern: {
              value: `^[A-Za-z0-9]+$`,
              errorMessage:
                "Your password must be composed only with letter and numbers"
            },
            minLength: {
              value: 6,
              errorMessage: "Your password must be between 6 and 12 characters"
            },
            maxLength: {
              value: 12,
              errorMessage: "Your password must be between 6 and 12 characters"
            }
          }}
        />
        <Button id="submit">Submit</Button>
      </AvForm>
    );
  }
}
