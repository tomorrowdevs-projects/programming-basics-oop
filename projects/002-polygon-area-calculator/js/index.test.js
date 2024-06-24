const shapeCalculator = require( './shapeCalculator.js' ); // For CommonJS environment

let rect, sq;

beforeEach(() => {
  rect = new shapeCalculator.Rectangle(3, 6);
  sq = new shapeCalculator.Square(5)
});

test('Expected Square class to be a subclass of the Rectangle class.', () => {
  const actual = shapeCalculator.Square.prototype instanceof shapeCalculator.Rectangle;
  const expected = true;
  expect(actual).toBe(expected);
});

test('Expected Square class to be a distinct class from the Rectangle class.', () => {
  const actual = Object.getPrototypeOf(shapeCalculator.Square) !== Object.getPrototypeOf(shapeCalculator.Rectangle);
  const expected = true;
  expect(actual).toBe(expected);
});

test('Expected square object to be an instance of the Square class and the Rectangle class.', () => {
  const actual = sq instanceof shapeCalculator.Square && sq instanceof shapeCalculator.Rectangle;
  const expected = true;
  expect(actual).toBe(expected);
});

test('Expected string representation of rectangle to be "Rectangle(width=3, height=6)"', () => {
  const actual = shapeCalculator.Rectangle.str(rect);
  const expected = "Rectangle(width=3, height=6)";
  expect(actual).toEqual(expected);
});

test('Expected string representation of square to be "Square(side=5)"', () => {
  const actual = shapeCalculator.Square.str(sq);
  const expected = "Square(side=5)";
  expect(actual).toEqual(expected);
});

describe('Expected area of ', () => {
  let actual, expected;

  test('rectangle to be 18', () => {
    actual = rect.getArea();
    expected = 18;
    expect(actual).toEqual(expected);
  });

  test('square to be 25', () => {
    actual = sq.getArea();
    expected = 25;
    expect(actual).toEqual(expected);
  });
});

describe('Expected perimeter of ', () => {
  let actual, expected;

  test('rectangle to be 18', () => {
    actual = rect.getPerimeter();
    expected = 18;
    expect(actual).toEqual(expected);
  });

  test('square to be 20', () => {
    actual = sq.getPerimeter();
    expected = 20;
    expect(actual).toEqual(expected);
  });
});


describe('Expected diagonal of ', () => {
  let actual, expected;

  test('rectangle to be 6.708203932499369', () => {
    actual = rect.getDiagonal();
    expected = 6.708203932499369;
    expect(actual).toEqual(expected);
  });

  test('square to be 7.0710678118654755', () => {
    actual = sq.getDiagonal();
    expected = 7.0710678118654755;
    expect(actual).toEqual(expected);
  });
});

describe('Expected string representation of ', () => {
  let actual, expected;

  beforeEach(() => {
    rect.setWidth(7)
    rect.setHeight(8)
    sq.setSide(2)
  });

  test('rectangle after setting new values to be "Rectangle(width=7, height=8)"', () => {
    actual = shapeCalculator.Rectangle.str(rect);
    expected = "Rectangle(width=7, height=8)";
    expect(actual).toEqual(expected);
  });

  test('square after setting new values to be "Square(side=2)"', () => {
    actual = shapeCalculator.Square.str(sq);
    expected = "Square(side=2)";
    expect(actual).toEqual(expected);
  });

  test('square after setting width to be "Square(side=4)"', () => {
    sq.setWidth(4);
    actual = shapeCalculator.Square.str(sq);
    expected = "Square(side=4)";
    expect(actual).toEqual(expected);
  });

  test('square after setting height to be "Square(side=8)"', () => {
    sq.setHeight(8);
    actual = shapeCalculator.Square.str(sq);
    expected = "Square(side=8)";
    expect(actual).toEqual(expected);
  });
});

test('Expected rectangle picture to be different.', () => {
  rect.setWidth(7);
  rect.setHeight(3);
  const actual = rect.getPicture();
  const expected = "*******\n*******\n*******\n";
  expect(actual).toEqual(expected);
});

test('Expected square picture to be different.', () => {
  sq.setSide(2);
  const actual = sq.getPicture();
  const expected = "**\n**\n";
  expect(actual).toEqual(expected);
});

test('Expected message: "Too big for picture."', () => {
  rect.setWidth(51);
  rect.setHeight(3);
  const actual = rect.getPicture();
  const expected = "Too big for picture.";
  expect(actual).toEqual(expected);
});

test('Expected `getAmountInside` to return 6.', () => {
  rect.setHeight(10);
  rect.setWidth(15);
  const actual = rect.getAmountInside(sq);
  const expected = 6;
  expect(actual).toEqual(expected);
});

test('Expected `getAmountInside` to return 1.', () => {
  const rect2 = new shapeCalculator.Rectangle(4, 8);
  const actual = rect2.getAmountInside(rect);
  const expected = 1;
  expect(actual).toEqual(expected);
});

test('Expected `getAmountInside` to return 0.', () => {
  const rect2 = new shapeCalculator.Rectangle(2, 3);
  const actual = rect2.getAmountInside(rect);
  const expected = 0;
  expect(actual).toEqual(expected);
});