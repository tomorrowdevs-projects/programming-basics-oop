const probCalculator = require( './probCalculator.js' ); // For CommonJS environment

test('Expected creation of hat object to add correct contents.', () => {
  const hat = new probCalculator.Hat({red: 3},{blue:2});
  const actual = hat.contents;
  const expected = ["red","red","red","blue","blue"];
  expect(actual).toEqual(expected);
});

test('Expected error on creation of hat object with empty arguments.', () => {
  const expected = new Error('Can\'t create the Hat, ball/s not found');
  expect(() => { new probCalculator.Hat() }).toThrow(expected);
});

test('Expected getContents method of hat object returns correct contents.', () => {
  const hat = new probCalculator.Hat({red: 3},{blue:2});
  const actual = hat.getContents();
  const expected = ["red","red","red","blue","blue"];
  expect(actual).toEqual(expected);
});

test('Expected getBalls method of hat object returns correct object.', () => {
  const hat = new probCalculator.Hat({red: 3},{blue:2});
  const actual = hat.getBalls();
  const expected = {red: 3, blue:2};
  expect(actual).toEqual(expected);
});

describe('Expected hat draw to ', () => {
  let actual, expected;
  const hat = new probCalculator.Hat({red: 5},{blue:2});

  test('return two random items from hat contents.', () => {
    actual = hat.draw(2);
    expected = ['blue', 'red'];
    expect(actual).toEqual(expected);
  });

  test('reduce number of items in contents.', () => {
    actual = hat.contents.length;
    expected = 5;
    expect(actual).toEqual(expected);
  });
});

describe('Expected experiment method to return a different probability. ', () => {
  let actual, expected, probability;

  test('First Hat.', () => {
    const hat = new probCalculator.Hat({blue:3},{red:2},{green:6});
    probability = probCalculator.experiment(hat, {blue:2,green:1}, 4, 1000);
    actual = probability;
    expected = 0.272;
    expect(actual >= (expected - 0.01)  && actual <= (expected + 0.01)).toBeTruthy();
  });

  test('Second Hat.', () => {
    const hat = new probCalculator.Hat({yellow:5},{red:1},{green:3},{blue:9},{test:1});
    probability = probCalculator.experiment(hat, {yellow:2,blue:3,test:1}, 20, 100);
    actual = probability;
    expected = 1.0;
    expect(actual >= (expected - 0.01)  && actual <= (expected + 0.01)).toBeTruthy();
  });
});