import React, { Component } from 'react';
import Mortgage from './lib/Mortgage';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      principal: '',
      interestRate: '',
      loanTerm: '',
      period: '12',
      monthlyPayment: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.calculateMonthlyPayment = this.calculateMonthlyPayment.bind(this); // <-- THIS IS CRITICAL
  }
  handleChange(event) {
  this.setState({ [event.target.name]: event.target.value });
}

calculateMonthlyPayment() {
  console.log(this.state);
  let mortgage = new Mortgage(
    Number(this.state.principal),
    Number(this.state.interestRate),
    Number(this.state.loanTerm),
    Number(this.state.period)
  );
  let monthlyPayment = mortgage.monthlyPayment();
  this.setState({ monthlyPayment });
}
  render() {
    return (
      <div className='App'>
        <h1>Mortgage Calculator</h1>
        <label>
          Principal
          <input onChange={this.handleChange} name='principal'
          value= {this.state.principal} />
        </label>
        <label>
          InterestRate
          <input onChange={this.handleChange} name='interestRate'
          value= {this.state.interestRate} />
        </label>
        <label>
          LoanTerm
          <input onChange={this.handleChange} name='loanTerm'
          value= {this.state.loanTerm} />
        </label>
        <label>
          Period
          <select onChange={this.handleChange} name='period'
          value={this.state.period}>
            <option value='12'>Monthly</option>
            <option value='4'>Quarterly</option>
          </select>
        </label>
        <button onClick={this.calculateMonthlyPayment} id='calculate'>Calculate</button>
        <div>
          <span>Monthly Payment</span>
          <p id='output'>{this.state.monthlyPayment ? `$${this.state.monthlyPayment}` : ''}</p>
        </div>
      </div>
    );
  }
}

