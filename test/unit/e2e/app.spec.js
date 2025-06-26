const expect = require('chai').expect;
const Nightmare = require('nightmare');
const PORT = 8888;
const app = require('../../../server/server'); // Adjust path as needed
const url = 'http://localhost:8888';

describe('End to End Tests', function() {
    this.timeout(10000);

    let httpServer = null;
    let pageObject = null;

    before(function (done) {
        httpServer = app.listen(PORT, done);
    });

    after(function (done) {
        if (httpServer) {
            httpServer.close(done);
            httpServer = null;
        } else {
            done();
        }
    });

    beforeEach(function () {
        pageObject = new Nightmare({ show: false }).goto(url);
    });

    afterEach(() => {
        return pageObject.end();
    });
    it ('should load the page',() => {
        return pageObject
            .evaluate(() => document.querySelector('body').innerText)
            .then(bodyText => {
                expect(bodyText).to.not.be.null;
                expect(bodyText).to.include('Mortgage Calculator');
                expect(bodyText).to.include('Calculate');
                expect(bodyText).to.include('Monthly Payment');
                expect(bodyText).to.include('Principal');
                expect(bodyText).to.include('InterestRate');
                expect(bodyText).to.include('LoanTerm');
                expect(bodyText).to.include('Period');
            });
    });

    it ('should contain a <h1> element for the page title', () => {
        return pageObject
            .evaluate(() => document.querySelector('h1').innerText)
            .then(headerText => {
                expect(headerText).to.not.be.null;
                expect(headerText).to.equal('Mortgage Calculator');
            });
    });
    it ('should contain a <p> element for the monthly payment', () => {
        return pageObject
            .evaluate(() => document.querySelector('#output').innerText)
            .then(outputText =>{
                expect(outputText).to.not.be.null;
                expect(outputText).to.equal('');
            });
    });
    it ('should contain an input for the principal', () => {
        return pageObject
            .evaluate(() => document.querySelector('input[name= "principal"]').value)
            .then(principalValue => {
                expect(principalValue).to.not.be.null;
                expect(principalValue).to.equal('');
            });
    });
    it ('should contain an input for the interestRate', () => {
        return pageObject
            .evaluate(() => document.querySelector('input[name= "interestRate"]').value)
            .then(interestRateValue => {
                expect(interestRateValue).to.not.be.null;
                expect(interestRateValue).to.equal('');
            });
    });
    it ('should contain an input for the loanTerm',() => {
        return pageObject
            .evaluate (() => document.querySelector('input[name= "loanTerm"]').value)
            .then(loanTermValue => {
                expect(loanTermValue).to.not.be.null;
                expect(loanTermValue).to.equal('');
            });
    });
    it ('should contain a select for the period', () => {
        return pageObject
            .evaluate(() => document.querySelector('select[name= "period"]').value)
            .then(periodValue => {
                expect(periodValue).to.not.be.null;
                expect(periodValue).to.equal('12');
            });
    });
    it('should calculate the monthly payment', () => {
  return pageObject
    .insert('input[name="principal"]', '100000')
    .insert('input[name="interestRate"]', '5')
    .insert('input[name="loanTerm"]', '30')
    .select('select[name="period"]', '12')
    .click('#calculate')
    .wait('#output')
    .evaluate(() => document.querySelector('#output').innerText)
    .then(monthlyPayment => {
      expect(Number(monthlyPayment.replace(/[^0-9.]/g, ''))).to.be.closeTo(536.82, 0.01); // <-- Use the value your Mortgage class actually returns
    });
});

it('should calculate monthly payment correctly', function() {
  return pageObject
    .insert('input[name="principal"]', '200000')
    .insert('input[name="interestRate"]', '4.5')
    .insert('input[name="loanTerm"]', '15')
    .select('select[name="period"]', '12')
    .click('#calculate')
    .wait('#output')
    .evaluate(() => document.querySelector('#output').innerText)
    .then(monthlyPayment => {
      expect(monthlyPayment).to.not.be.null;
      expect(Number(monthlyPayment.replace(/[^0-9.]/g, ''))).to.be.closeTo(1529.99, 0.01); // <-- Update to match your formula
    });
});

it('should set the state with the calculated monthly payment', function() {
    return pageObject
        .insert('input[name="principal"]', '250000')
        .insert('input[name="interestRate"]', '3.5')
        .insert('input[name="loanTerm"]', '20')
        .select('select[name="period"]', '12')
        .wait(600)
        .click('#calculate')
        .wait('#output')
        .evaluate(() => {
            const rawText = document.querySelector('#output').innerText;
            // Parse numeric value from formatted text, e.g. "$1,449.13"
            const monthlyPayment = Number(rawText.replace(/[^0-9.]/g, ''));
            return monthlyPayment;  // Return number, not string
        })
        .then(monthlyPayment => {
            // Here you can check or set state as needed
            expect(monthlyPayment).to.not.be.null;
            expect(monthlyPayment).to.be.closeTo(1449.90, 0.01);
        });
});

it('should calculate monthly payment using the calculateMonthlyPayment method', function() {
  return pageObject
    .insert('input[name="principal"]', '300000')
    .insert('input[name="interestRate"]', '4')
    .insert('input[name="loanTerm"]', '25')
    .select('select[name="period"]', '12')
    .click('#calculate')
    .wait('#output')
    .evaluate(() => document.querySelector('#output').innerText)
    .then(monthlyPayment => {
      expect(Number(monthlyPayment.replace(/[^0-9.]/g, ''))).to.be.closeTo(1583.51, 0.01); // <-- Update to match your formula
    });
});
    
    });





