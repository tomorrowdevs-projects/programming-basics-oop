/** Class representing a Rectangle. */
class Rectangle {
    /**
     * Creates a rectangle as wide as the width parameter and as long as the height parameter.     
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
    /**
     * Sets the width of the rectangle
     * @param {number} value - The width
     */
    setWidth(value){
        this.width = value;
    }
    /**
     * Sets the height of the rectangle
     * @param {number} value - The height
     */
    setHeight(value){
        this.height = value;
    }
    /**
     * Returns the area of the rectangle
     * @returns {number} The area
     */
    getArea(){
        return this.width * this.height;
    }
    /**
     * Returns the perimeter of the rectangle
     * @returns {number} The perimeter
     */
    getPerimeter(){
        return 2 * this.width + 2 * this.height;
    }
    /**
     * Returns the diagonal of the rectangle
     * @returns {number} The diagonal
     */
    getDiagonal(){
        return (this.width ** 2 + this.height ** 2) ** .5;
    }
    /**
     * Returns a string that represents the shape of the rectangle using lines of "*" 
     * @returns {string} The picture
     */
    getPicture(){
        if(this.width > 50 || this.height > 50)
            return 'Too big for picture.';

        let picture = '';        
        for (let i = 0; i < this.height; i++) {
            picture += `${'*'.repeat(this.width)}\n`;
        }

        return picture;
    }
    /**
     * 
     * @param {number} shape 
     * @returns 
     */
    getAmountInside(shape){
        return Math.trunc(this.width / shape.width) * Math.trunc(this.height / shape.height);
    }
    /**
     * A static method that returns the relevant data of the rectangle, i.e.: the name, the width and the height
     * @param {Rectangle} rectangle - The rectangle to be processed
     * @returns {string} The relevant data of the category
     */
    static str(rectangle){
        return `Rectangle(width=${rectangle.width}, height=${rectangle.height})`;
    }
}
/** Class representing a Square, derived by Rectangle Class. */
class Square extends Rectangle {
    /**
     * Creates a square whose side is as long as the side parameter
     * @param {*} side 
     */
    constructor(side){
        super(side, side);
    }
    /**
     * Sets the side of the square
     * @param {number} value - The side
     */
    setSide(value){
        this.width = value;
        this.height = value;
    }
    /**
     * Sets the width of the square
     * @param {number} value - The width
     */
    setWidth(value){
        this.setSide(value);
    }
    /**
     * Sets the height of the square
     * @param {number} value - The height
     */
    setHeight(value){
        this.setSide(value);
    }
    /**
     * A static method that returns the relevant data of the square, i.e.: the name and the side
     * @param {Square} square - The rectangle to be processed
     * @returns {string} The relevant data of the category
     */
    static str(square){
        return `Square(side=${square.width})`;
    }
}

module.exports = { // For CommonJS environment
// export { // For ES module environment. In addition for Visual Studio Code two package.json files must be created, one in this file folder, the other one in the application file folder, they must contain the following code { "type": "module" }
    Rectangle,
    Square
};