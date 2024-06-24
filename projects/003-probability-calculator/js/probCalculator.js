/** Class representing a Hat. */
class Hat {
    /**
     * Creates a hat containing balls whose color and number is determined by the list that is passed during creation, a hat without balls cannot be created
     * @param  {...object} balls - The list of balls. 
     */
    constructor(...balls){ // Python's kwargs operator doesn't exist In Javascript, then it was chosen to pass a series of objects
        if(balls.length === 0){
            throw new Error('Can\'t create the Hat, ball/s not found');
        }

        this.balls = balls.reduce( (totalBalls, ball) => ({...totalBalls, ...ball}));
        this.contents = Hat.quantityBallsToOccurence(this.balls);
    }
    /**
     * Returns the list of balls as a list that groups the colors and their quantities as pairs: {colorBall1: quantity, colorBall2: quantity, etc.}
     * @returns {object} The list of balls
     */
    getBalls(){
        return this.balls;
    }
    /**
     * Returns the list of balls as a list in which each ball is represented by color alone: ["singleBallColor1", "singleBallColor2", etc.]
     * @returns {Array} The list of balls
     */
    getContents(){
        return this.contents;
    }
    /**
     * Returns a list of balls randomly drawn from the hat
     * @param {number} ballsToDraw - Number of balls to draw from the hat
     * @returns {Array} The list of balls randomly drawn from the hat
     */
    draw(ballsToDraw){
        let remainingBalls = this.contents;
        let drawnBalls = [];

        if(ballsToDraw > remainingBalls.length){
            return remainingBalls;
        }

        for (let i = 0; i < ballsToDraw; i++) {
            const randomNumber = Math.floor(Math.random() * remainingBalls.length);
            drawnBalls.push(remainingBalls.splice(randomNumber, 1)[0]);
        }

        return drawnBalls;
    }
    /**
     * A static method that returns the list of balls represented as pairs of color and quantity converted into a list in which each ball is represented by color alone
     * @param {object} listToConvert - The list of balls to convert
     * @returns {Array} The converted list of balls
     */
    static quantityBallsToOccurence(listToConvert){
        let listConverted = [];

        for (const ballColor in listToConvert) {
            for (let i = 0; i < listToConvert[ballColor]; i++) {
                listConverted.push(ballColor);
            }
        }

        return listConverted;
    }

}
/**
 * Returns a deep copy of an object including its properties and methods separate from the original object
 * @param {object} objectToCopy - The original object to copy
 * @returns {object} The resulting copied object
 */
function deepCopyObject(objectToCopy) {
    const copiedObject = structuredClone(objectToCopy);
    Object.setPrototypeOf(copiedObject, Object.getPrototypeOf(objectToCopy));

    return copiedObject;
}

// Approach suggested in the exercise
/**
 * Returns the probability that occurs when trying to find how many times a list of balls matches the one given by a draw from a hat
 * @param {Hat} hat - The hat object containing balls that should be copied inside the function
 * @param {object} expctedBalls - The list of balls to attempt to draw from the hat for the experiment
 * @param {number} numBallsDrawn - Quantity of balls to extract from the hat
 * @param {number} numExperiments - Quantity of experiments to perform
 * @returns {number} The probability
 */
function experiment(hat, expctedBalls, numBallsDrawn, numExperiments){
    let manyTimes = 0;
    
    for (let i = 0; i < numExperiments; i++) {
        const hatCopy = deepCopyObject(hat);
        const drawnBalls = hatCopy.draw(numBallsDrawn);

        let success = true;

        for (const key in expctedBalls) {
            const drawnBallsFounded = drawnBalls.filter(value => {
                if(value === key){
                    return value
                }
            });

            if (drawnBallsFounded.length < expctedBalls[key]) {
                success = false;
                break;
            }
        }

        if(success === true){
            manyTimes += 1;
        }
    }

    return manyTimes/numExperiments;
}

// Custom approach
/**
 * Tests whether a given list of balls is found during a random hat draw
 * @param {Array} expctedBalls - The list of balls to attempt to draw from the hat
 * @param {Array} drawnBalls - The list of balls drawn
 * @returns {boolean} `false` if the given list of balls is not found during the random hat draw, otherwise `true`
 */
/*
function checkDrawResult(expctedBalls, drawnBalls){
    for (let i = 0; i < expctedBalls.length; i++) {
        if(drawnBalls.includes(expctedBalls[i])){
            drawnBalls.splice(drawnBalls.indexOf(expctedBalls[i]), 1);
        } else {
            return false;
        }
    }

    return true;
}

function experiment(hat, expctedBalls, numBallsDrawn, numExperiments){
    let manyTimes = 0;

    expctedBalls = Hat.quantityBallsToOccurence(expctedBalls);
    
    for (let i = 0; i < numExperiments; i++) {
        const hatCopy = deepCopyObject(hat);
        const drawnBalls = hatCopy.draw(numBallsDrawn);

        if(checkDrawResult(expctedBalls, drawnBalls)){
            manyTimes += 1;
        }
    }

    return manyTimes/numExperiments;
}
*/

module.exports = { // For CommonJS environment
// export { // For ES module environment. In addition for Visual Studio Code two package.json files must be created, one in this file folder, the other one in the application file folder, they must contain the following code { "type": "module" }
    Hat,
    experiment
};