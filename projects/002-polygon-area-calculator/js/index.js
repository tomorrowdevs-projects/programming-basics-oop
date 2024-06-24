const shapeCalculator = require( './shapeCalculator.js' ); // For CommonJS environment

function init(){
    const rect = new shapeCalculator.Rectangle(10, 5);
    console.log(rect.getArea());
    rect.setHeight(3);
    console.log(rect.getPerimeter());
    console.log(shapeCalculator.Rectangle.str(rect));
    console.log(rect.getPicture());

    const sq = new shapeCalculator.Square(9);
    console.log(sq.getArea());
    sq.setSide(4);
    console.log(sq.getDiagonal());
    console.log(shapeCalculator.Square.str(sq));
    console.log(sq.getPicture());

    rect.setHeight(8);
    rect.setWidth(16);
    console.log(rect.getAmountInside(sq));
}

init();