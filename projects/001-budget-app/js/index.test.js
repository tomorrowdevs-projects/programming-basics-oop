const {
  Category,
  createSpendChart
} = require( './index.js' ); // For CommonJS environment

let food, entertainment, business;

beforeEach(() => {
  food = new Category("Food");
  entertainment = new Category("Entertainment");
  business = new Category("Business");
});

test('Expected `deposit` method to create a specific object in the ledger instance variable.', () => {
  food.deposit(900, "deposit");
  const actual = food.ledger[0];
  const expected = { amount: 900, description: "deposit" };
  expect(actual).toEqual(expected);
});

test('Expected calling `deposit` method with no description to create a blank description.', () => {
  food.deposit(45.56);
  const actual = food.ledger[0];
  const expected = {amount: 45.56, description: ""};
  expect(actual).toEqual(expected);
});

describe('Expected `withdraw` method ', () => {
  let good_withdraw, actual, expected;

  beforeEach(() => {
    food.deposit(900, "deposit");
    good_withdraw = food.withdraw(45.67)
    actual = food.ledger[1];
    expected = {amount: -45.67, description: ""};
  });

  test('with no description to create a blank description.', () => {
    
    expect(actual).toEqual(expected);
  });

  test('to return `true`.', () => {
    expect(good_withdraw).toEqual(true);
  });
});

test('Expected balance to be 854.33', () => {
  food.deposit(900, "deposit");
  food.withdraw(45.67, "milk, cereal, eggs, bacon, bread");
  const actual = food.getBalance();
  const expected = 854.33;
  expect(actual).toEqual(expected);
});

describe('Expected `transfer` method to ', () => {
  let good_transfer, actual, expected;

  beforeEach(() => {
    food.deposit(900, "deposit")
    food.withdraw(45.67, "milk, cereal, eggs, bacon, bread")
    good_transfer = food.transfer(20, entertainment)
    actual = food.ledger[2]
    expected = {amount: -20, description: "Transfer to Entertainment"}
  });

  test('create a specific ledger item in food object.', () => {
    expect(actual).toEqual(expected);
  });

  test('return `true`.', () => {
    expect(good_transfer).toBe(true);
  });

  test('create a specific ledger item in entertainment object.', () => {
    actual = entertainment.ledger[0];
    expected = {amount: 20, description: "Transfer from Food"};
    expect(actual).toEqual(expected);
  });
});

describe('Expected `checkFunds` method to be ', () => {
  let actual, expected;

  beforeEach(() => {
    food.deposit(10, "deposit");
  });

  test('return `false`.', () => {
    actual = food.checkFunds(20);
    expected = false;
    expect(actual).toBe(expected);
  });

  test('return `true`.', () => {
    actual = food.checkFunds(10);
    expected = true;
    expect(actual).toBe(expected);
  });
});

test('Expected `withdraw` method to return `false`.', () => {
  food.deposit(100, "deposit");
  const good_withdraw = food.withdraw(100.10);
  expect(good_withdraw).toBe(false);
});

test('Expected `transfer` method to return `false`.', () => {
  food.deposit(100, "deposit");
  const good_transfer = food.transfer(200, entertainment);
  expect(good_transfer).toBe(false);
});

test('Expected different string representation of object.', () => {
  food.deposit(900, "deposit");
  food.withdraw(45.67, "milk, cereal, eggs, bacon, bread");
  food.transfer(20, entertainment);
  const actual = Category.str(food);
  const expected = `*************Food*************\ndeposit                 900.00\nmilk, cereal, eggs, bac -45.67\nTransfer to Entertainme -20.00\nTotal: 834.33`;
  expect(actual).toEqual(expected);
});

test('Expected different chart representation. Check that all spacing is exact.', () => {
  food.deposit(900, "deposit");
  entertainment.deposit(900, "deposit");
  business.deposit(900, "deposit");
  food.withdraw(105.55);
  entertainment.withdraw(33.40);
  business.withdraw(10.99);
  const actual = createSpendChart([business, food, entertainment]);
  const expected = "Percentage spent by category\n100|          \n 90|          \n 80|          \n 70|    o     \n 60|    o     \n 50|    o     \n 40|    o     \n 30|    o     \n 20|    o  o  \n 10|    o  o  \n  0| o  o  o  \n    ----------\n     B  F  E  \n     u  o  n  \n     s  o  t  \n     i  d  e  \n     n     r  \n     e     t  \n     s     a  \n     s     i  \n           n  \n           m  \n           e  \n           n  \n           t  ";
  expect(actual).toEqual(expected);
});

test('Expected different string representation of object with a name made up of odd letters.', () => {
  entertainment.deposit(900, "deposit");
  entertainment.withdraw(20.67, "movie, music");
  entertainment.transfer(50, food);
  const actual = Category.str(entertainment);
  const expected = `********Entertainment*********\ndeposit                 900.00\nmovie, music            -20.67\nTransfer to Food        -50.00\nTotal: 829.33`;
  expect(actual).toEqual(expected);
});