module.exports = class Mortgage {
  constructor(principal, interestRate, loanTerm, period) {
    this.principal = Number(principal);
    this.interestRate = Number(interestRate);
    this.loanTerm = Number(loanTerm);
    this.period = Number(period);
  }

  monthlyPayment() {
    // Standard amortization formula:
    // M = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const P = this.principal;
    const n = this.loanTerm * this.period;
    const r = (this.interestRate / 100) / this.period;
    if (r === 0) return P / n;
    const numerator = P * r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    return Number((numerator / denominator).toFixed(2));
  }
}




