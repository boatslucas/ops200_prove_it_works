const expect = require ('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    

    it('should have a monthlyPayment function', () => {
        const mortgage = new Mortgage(100000, 5, 30, 12);
        expect(mortgage.monthlyPayment).to.be.a('function');
    });
    });

    it('should calculate monthly payment correctly', () => {
  const mortgage = new Mortgage(100000, 5, 30, 12);
  expect(mortgage.monthlyPayment()).to.be.closeTo(536.82, 0.01);
});

   it('should calculate monthly payment with different interest rates correctly', () => {
  expect(new Mortgage(200000, 3.5, 15, 12).monthlyPayment()).to.be.closeTo(1429.77, 0.01);
  expect(new Mortgage(200000, 4.0, 15, 12).monthlyPayment()).to.be.closeTo(1479.38, 0.01);
  expect(new Mortgage(200000, 4.5, 15, 12).monthlyPayment()).to.be.closeTo(1529.99, 0.01);
});

it('should calculate monthly payments with different principals correctly', () => {
  expect(new Mortgage(150000, 3.5, 30, 12).monthlyPayment()).to.be.closeTo(673.57, 0.01);
  expect(new Mortgage(250000, 3.5, 30, 12).monthlyPayment()).to.be.closeTo(1122.61, 0.01);
  expect(new Mortgage(300000, 3.5, 30, 12).monthlyPayment()).to.be.closeTo(1347.13, 0.01);
});

it('should calculate monthly payments with different terms correctly', () => {
  expect(new Mortgage(200000, 3.5, 20, 12).monthlyPayment()).to.be.closeTo(1159.92, 0.01);
  expect(new Mortgage(200000, 3.5, 25, 12).monthlyPayment()).to.be.closeTo(1001.25, 0.01);
  expect(new Mortgage(200000, 3.5, 30, 12).monthlyPayment()).to.be.closeTo(898.09, 0.01);
});