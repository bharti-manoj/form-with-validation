import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      password: '',
      formErrors: { name: '', email: '', mobile: '', password: '' },
      nameValid: false,
      emailValid: false,
      mobileValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let mobileValid = this.state.mobileValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.match(/^[a-zA-Z_ ]*$/i);
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'mobile':
        mobileValid = value.match(/^\d{10}$/i);
        fieldValidationErrors.mobile = mobileValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      emailValid: emailValid,
      mobileValid: mobileValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.emailValid && this.state.mobileValid && this.state.passwordValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  submit = (e) => {
    e.preventDefault()
    console.log({ Name: this.state.name, Email: this.state.email, Mobile: this.state.mobile, Password: this.state.password })
  }

  render() {
    return (
      <form className="demoForm">
        <h2>Please Enter User Informations</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
          <label htmlFor="name">Full Name</label>
          <input type="text" required className="form-control" name="name"
            placeholder="Name"
            value={this.state.name}
            maxLength={26}
            onChange={this.handleUserInput} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.mobile)}`}>
          <label htmlFor="mobile">Mobile Number</label>
          <input type="text" required className="form-control" name="mobile"
            placeholder="Mobile Number"
            maxLength={10}
            value={this.state.mobile}
            onChange={this.handleUserInput} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid} onClick={this.submit}>Submit</button>
      </form>
    )
  }
}

export default Form;
